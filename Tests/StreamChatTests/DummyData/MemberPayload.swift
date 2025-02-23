//
// Copyright © 2021 Stream.io Inc. All rights reserved.
//

import Foundation
@testable import StreamChat

extension MemberPayload where ExtraData == NoExtraData {
    /// Returns a dummy member payload with the given `userId` and `role`
    static func dummy(
        userId: UserId = .unique,
        createdAt: Date = .unique,
        updatedAt: Date = .unique,
        role: MemberRole = .member
    ) -> MemberPayload {
        .init(
            user: .dummy(userId: userId),
            role: role,
            createdAt: createdAt,
            updatedAt: updatedAt
        )
    }
}

extension MemberContainerPayload where ExtraData == NoExtraData {
    static func dummy(userId: UserId = .unique) -> MemberContainerPayload {
        .init(member: .dummy(userId: userId), invite: nil, memberRole: nil)
    }
}
