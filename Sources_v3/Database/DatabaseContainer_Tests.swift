//
// Copyright © 2020 Stream.io Inc. All rights reserved.
//

import CoreData
@testable import StreamChatClient
import XCTest

class DatabaseContainer_Tests: StressTestCase {
    func test_databaseContainer_isInitialized_withInMemoryPreset() {
        XCTAssertNoThrow(try DatabaseContainer(kind: .inMemory))
    }
    
    func test_databaseContainer_isInitialized_withOnDiskPreset() {
        let dbURL = URL.newTemporaryFileURL()
        XCTAssertNoThrow(try DatabaseContainer(kind: .onDisk(databaseFileURL: dbURL)))
        XCTAssertTrue(FileManager.default.fileExists(atPath: dbURL.path))
    }
    
    func test_databaseContainer_propagatesError_wnenInitializedWithIncorrectURL() {
        let dbURL = URL(fileURLWithPath: "/") // This URL is not writable
        XCTAssertThrowsError(try DatabaseContainer(kind: .onDisk(databaseFileURL: dbURL)))
    }
    
    func test_writeCompletionBlockIsCalled() throws {
        let container = try DatabaseContainer(kind: .inMemory)
        
        // Write a valid entity to DB and wait for the completion block to be called
        let successCompletion = try await { container.write({ session in
            let context = session as! NSManagedObjectContext
            let teamDTO = NSEntityDescription.insertNewObject(forEntityName: "TeamDTO", into: context) as! TeamDTO
            teamDTO.id = .unique
        }, completion: $0) }
        
        // Assert the completion was called with `nil` error value
        XCTAssertNil(successCompletion)
        
        // Write an invalid entity to DB and wait for the completion block to be called with error
        let errorCompletion = try await { container.write({ session in
            let context = session as! NSManagedObjectContext
            NSEntityDescription.insertNewObject(forEntityName: "TeamDTO", into: context)
            // Team id is not set, this should produce an error
        }, completion: $0) }
        
        // Assert the completion was called with an error
        XCTAssertNotNil(errorCompletion)
    }
    
    func test_removingAllData() throws {
        let container = try DatabaseContainer(kind: .inMemory)
        
        // Add some random objects and for completion block
        let error = try await {
            container.write({ session in
                                try session.saveChannel(payload: self.dummyPayload(with: .unique), query: nil)
                                try session.saveChannel(payload: self.dummyPayload(with: .unique), query: nil)
                                try session.saveChannel(payload: self.dummyPayload(with: .unique), query: nil)
                            },
                            completion: $0)
        }
        XCTAssertNil(error)
        
        // Delete the data
        _ = try await { container.removeAllData(force: true, completion: $0) }
        
        // Assert the DB is empty by trying to fetch all possible entities
        try container.managedObjectModel.entities.forEach { entityDescription in
            let fetchRequrest = NSFetchRequest<NSManagedObject>(entityName: entityDescription.name!)
            let fetchedObjects = try container.viewContext.fetch(fetchRequrest)
            XCTAssertTrue(fetchedObjects.isEmpty)
        }
    }
}

/// A testable subclass of DatabaseContainer allowing response simulation.
class TestDatabaseContainer: DatabaseContainer {
    /// If set, the `write` completion block is called with this value.
    var write_errorResponse: Error?
    
    override func write(_ actions: @escaping (DatabaseSession) throws -> Void, completion: @escaping (Error?) -> Void) {
        if let error = write_errorResponse {
            super.write(actions, completion: { _ in })
            completion(error)
        } else {
            super.write(actions, completion: completion)
        }
    }
}

extension TestDatabaseContainer {
    /// Writes changes to the DB synchronously. Only for test purposes!
    func writeSynchronously(_ actions: @escaping (DatabaseSession) throws -> Void) throws {
        _ = try await { completion in
            self.write(actions, completion: completion)
        }
    }
    
    /// Synchrnously creates a new CurrentUserDTO in the DB with the given id.
    func createCurrentUser(id: UserId = .unique) throws {
        try writeSynchronously { session in
            try session.saveCurrentUser(payload: .dummy(userId: id,
                                                        role: .admin,
                                                        extraData: NameAndImageExtraData(name: nil, imageURL: nil)))
        }
    }
    
    /// Synchrnously creates a new ChannelDTO in the DB with the given cid.
    func createChannel(cid: ChannelId = .unique) throws {
        try writeSynchronously { session in
            try session.saveChannel(payload: XCTestCase().dummyPayload(with: cid))
        }
    }
}
