//
// Copyright © 2021 Stream.io Inc. All rights reserved.
//

import CoreData
@testable import StreamChat
import XCTest

/// A testable subclass of DatabaseContainer allowing response simulation.
class DatabaseContainerMock: DatabaseContainer {
    /// If set, the `write` completion block is called with this value.
    @Atomic var write_errorResponse: Error?
    @Atomic var init_kind: DatabaseContainer.Kind
    @Atomic var removeAllData_called = false
    @Atomic var removeAllData_errorResponse: Error?
    @Atomic var recreatePersistentStore_called = false
    @Atomic var recreatePersistentStore_errorResponse: Error?
    @Atomic var resetEphemeralValues_called = false
    
    /// If set to `true` and the mock will remove its database files once deinited.
    private var shouldCleanUpTempDBFiles = false
    
    convenience init(localCachingSettings: ChatClientConfig.LocalCaching? = nil) {
        try! self.init(kind: .onDisk(databaseFileURL: .newTemporaryFileURL()), localCachingSettings: localCachingSettings)
        shouldCleanUpTempDBFiles = true
    }
    
    override init(
        kind: DatabaseContainer.Kind,
        shouldFlushOnStart: Bool = false,
        shouldResetEphemeralValuesOnStart: Bool = true,
        modelName: String = "StreamChatModel",
        bundle: Bundle? = nil,
        localCachingSettings: ChatClientConfig.LocalCaching? = nil
    ) throws {
        init_kind = kind
        try super.init(
            kind: kind,
            shouldFlushOnStart: shouldFlushOnStart,
            shouldResetEphemeralValuesOnStart: shouldResetEphemeralValuesOnStart,
            modelName: modelName,
            bundle: bundle,
            localCachingSettings: localCachingSettings
        )
    }
    
    deinit {
        // Remove the database file if the container requests that
        if shouldCleanUpTempDBFiles, case let .onDisk(databaseFileURL: url) = init_kind {
            do {
                try FileManager.default.removeItem(at: url)
            } catch {
                fatalError("Failed to remove temp database file: \(error)")
            }
        }
    }
    
    override func removeAllData(force: Bool = true) throws {
        removeAllData_called = true

        if let error = removeAllData_errorResponse {
            throw error
        }

        try super.removeAllData(force: force)
    }
    
    override func recreatePersistentStore() throws {
        recreatePersistentStore_called = true
        
        if let error = recreatePersistentStore_errorResponse {
            throw error
        }
        
        try super.recreatePersistentStore()
    }

    override func write(_ actions: @escaping (DatabaseSession) throws -> Void, completion: @escaping (Error?) -> Void) {
        if let error = write_errorResponse {
            super.write(actions, completion: { _ in })
            completion(error)
        } else {
            super.write(actions, completion: completion)
        }
    }
    
    override func resetEphemeralValues() {
        resetEphemeralValues_called = true
        super.resetEphemeralValues()
    }
}

extension DatabaseContainer {
    /// Writes changes to the DB synchronously. Only for test purposes!
    func writeSynchronously(_ actions: @escaping (DatabaseSession) throws -> Void) throws {
        let error = try await { completion in
            self.write(actions, completion: completion)
        }
        if let error = error {
            throw error
        }
    }

    /// Synchronously creates a new UserDTO in the DB with the given id.
    func createUser(id: UserId = .unique, extraData: NoExtraData = .defaultValue) throws {
        try writeSynchronously { session in
            try session.saveUser(payload: .dummy(userId: id, extraData: extraData))
        }
    }

    /// Synchronously creates a new CurrentUserDTO in the DB with the given id.
    func createCurrentUser(id: UserId = .unique) throws {
        try writeSynchronously { session in
            try session.saveCurrentUser(payload: .dummy(
                userId: id,
                role: .admin,
                extraData: NoExtraData.defaultValue
            ))
        }
    }
    
    /// Synchronously creates a new ChannelDTO in the DB with the given cid.
    func createChannel(cid: ChannelId = .unique, withMessages: Bool = true) throws {
        try writeSynchronously { session in
            let dto = try session.saveChannel(payload: XCTestCase().dummyPayload(with: cid))
            
            // Delete possible messages from the payload if `withMessages` is false
            if !withMessages {
                let context = session as! NSManagedObjectContext
                dto.messages.forEach { context.delete($0) }
                dto.oldestMessageAt = .distantPast
            }
        }
    }
    
    func createChannelListQuery(
        filter: Filter<ChannelListFilterScope> = .query(.cid, text: .unique)
    ) throws {
        try writeSynchronously { session in
            let dto = NSEntityDescription
                .insertNewObject(
                    forEntityName: ChannelListQueryDTO.entityName,
                    into: session as! NSManagedObjectContext
                ) as! ChannelListQueryDTO
            dto.filterHash = filter.filterHash
            dto.filterJSONData = try JSONEncoder.default.encode(filter)
        }
    }
    
    func createUserListQuery(filter: Filter<UserListFilterScope> = .query(.id, text: .unique)) throws {
        try writeSynchronously { session in
            let dto = NSEntityDescription
                .insertNewObject(
                    forEntityName: UserListQueryDTO.entityName,
                    into: session as! NSManagedObjectContext
                ) as! UserListQueryDTO
            dto.filterHash = filter.filterHash
            dto.filterJSONData = try JSONEncoder.default.encode(filter)
        }
    }
    
    func createMemberListQuery<ExtraData: UserExtraData>(query: _ChannelMemberListQuery<ExtraData>) throws {
        try writeSynchronously { session in
            try session.saveQuery(query)
        }
    }
    
    /// Synchronously creates a new MessageDTO in the DB with the given id.
    func createMessage(
        id: MessageId = .unique,
        authorId: UserId = .unique,
        cid: ChannelId = .unique,
        text: String = .unique,
        pinned: Bool = false,
        pinnedByUserId: UserId? = nil,
        pinnedAt: Date? = nil,
        pinExpires: Date? = nil,
        attachments: [AttachmentPayload] = [],
        localState: LocalMessageState? = nil,
        type: MessageType? = nil
    ) throws {
        try writeSynchronously { session in
            try session.saveChannel(payload: XCTestCase().dummyPayload(with: cid))
            
            let message: MessagePayload<NoExtraData> = .dummy(
                type: type,
                messageId: id,
                attachments: attachments,
                authorUserId: authorId,
                text: text,
                pinned: pinned,
                pinnedByUserId: pinnedByUserId,
                pinnedAt: pinnedAt,
                pinExpires: pinExpires
            )
            
            let messageDTO = try session.saveMessage(payload: message, for: cid)
            messageDTO.localMessageState = localState
        }
    }
    
    func createMember(
        userId: UserId = .unique,
        role: MemberRole = .member,
        cid: ChannelId,
        query: ChannelMemberListQuery? = nil
    ) throws {
        try writeSynchronously { session in
            try session.saveMember(
                payload: .dummy(userId: userId, role: role),
                channelId: query?.cid ?? cid,
                query: query
            )
        }
    }
}
