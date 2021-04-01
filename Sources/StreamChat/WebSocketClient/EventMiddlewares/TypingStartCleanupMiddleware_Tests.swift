//
// Copyright © 2021 Stream.io Inc. All rights reserved.
//

@testable import StreamChat
import XCTest

class TypingStartCleanupMiddleware_Tests: XCTestCase {
    var middleware: TypingStartCleanupMiddleware<NoExtraData>!
    var currentUser: ChatUser!
    
    var time: VirtualTime!
    // The database is not really used in the middleware but it's a requirement by the protocol
    // to provide a database session
    var database: DatabaseContainer!
    
    override func setUp() {
        super.setUp()
        
        currentUser = ChatUser(id: "Luke")
        middleware = TypingStartCleanupMiddleware(excludedUserIds: { [self.currentUser.id] })
        
        time = VirtualTime()
        VirtualTimeTimer.time = time
        middleware.timer = VirtualTimeTimer.self
        
        database = DatabaseContainerMock()
    }
    
    override func tearDown() {
        AssertAsync.canBeReleased(&database)
        super.tearDown()
    }
    
    func test_stopTypingEvent_notSentForExcludedUsers() {
        var result: [EquatableEvent?] = []
        let typingStartEvent = TypingEvent(isTyping: true, cid: .unique, userId: currentUser.id)
        // Handle a new TypingStart event for the current user and collect resulting events
        middleware.handle(event: typingStartEvent, session: database.viewContext) {
            result.append($0.map(EquatableEvent.init))
        }
        
        // Simulate time passed for the `typingStartTimeout` period
        time.run(numberOfSeconds: .incomingTypingStartEventTimeout + 1)
        
        XCTAssertEqual(result, [typingStartEvent].asEquatable())
    }
    
    func test_stopTypingEvent_sentAfterTimeout() {
        // Simulate some user started typing
        let otherUser = ChatUser(id: UUID().uuidString)
        let cid = ChannelId.unique
        
        var result: [EquatableEvent?] = []
        let startTyping = TypingEvent(isTyping: true, cid: cid, userId: otherUser.id)
        // Handle a new TypingStart event for the current user and collect resulting events
        middleware.handle(event: startTyping, session: database.viewContext) {
            result.append($0.map(EquatableEvent.init))
        }
        
        // Wait for some timeout shorter than `typingStartTimeout` and assert only `TypingStart` event is sent
        time.run(numberOfSeconds: .incomingTypingStartEventTimeout - 1)
        XCTAssertEqual(result, [startTyping.asEquatable])
        
        // Wait for more time and expect a `typingStop` event.
        time.run(numberOfSeconds: 2)
        let stopTyping = TypingEvent(isTyping: false, cid: cid, userId: otherUser.id)
        XCTAssertEqual(result, [startTyping.asEquatable, stopTyping.asEquatable])
        
        // Wait much longer and assert no more `typingStop` events.
        time.run(numberOfSeconds: 5 + .incomingTypingStartEventTimeout)
        XCTAssertEqual(result, [startTyping.asEquatable, stopTyping.asEquatable])
    }
}
