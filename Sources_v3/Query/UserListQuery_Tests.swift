//
// Copyright © 2020 Stream.io Inc. All rights reserved.
//

@testable import StreamChatClient
import XCTest

class UserListQuery_Tests: XCTestCase {
    // Test UserListQuery encoded correctly
    func test_UserListQuery_encodedCorrectly() throws {
        let filter: Filter = .contains("name", "a")
        let sort: [Sorting<UserListSortingKey>] = [.init(key: .lastActiveAt)]
        let pagination: Pagination = .init(arrayLiteral: .offset(3))

        // Create UserListQuery
        let query = UserListQuery(
            filter: filter,
            sort: sort,
            pagination: pagination
        )

        let expectedData: [String: Any] = [
            "presence": true,
            "offset": 3,
            "filter_conditions": ["name": ["$contains": "a"]],
            "sort": [["key": "lastActiveAt", "direction": -1]]
        ]

        let expectedJSON = try JSONSerialization.data(withJSONObject: expectedData, options: [])
        let encodedJSON = try JSONEncoder.default.encode(query)

        // Assert UserListQuery encoded correctly
        AssertJSONEqual(expectedJSON, encodedJSON)
    }
}