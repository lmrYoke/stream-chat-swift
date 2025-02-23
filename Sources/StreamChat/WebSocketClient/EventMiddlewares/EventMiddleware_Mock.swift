//
// Copyright © 2021 Stream.io Inc. All rights reserved.
//

import Foundation
@testable import StreamChat

/// A test middleware that can be initiated with a closure
final class EventMiddlewareMock: EventMiddleware {
    var closure: (Event, @escaping (Event?) -> Void) -> Void
    
    init(closure: @escaping (Event, @escaping (Event?) -> Void) -> Void = { $1($0) }) {
        self.closure = closure
    }
    
    func handle(event: Event, completion: @escaping (Event?) -> Void) {
        closure(event, completion)
    }
}
