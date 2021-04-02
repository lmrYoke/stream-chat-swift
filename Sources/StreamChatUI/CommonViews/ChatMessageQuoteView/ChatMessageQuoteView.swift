//
// Copyright © 2021 Stream.io Inc. All rights reserved.
//

import StreamChat
import UIKit

public typealias ChatMessageQuoteView = _ChatMessageQuoteView<NoExtraData>

open class _ChatMessageQuoteView<ExtraData: ExtraDataTypes>: _View, UIConfigProvider {
    /// The avatar position in relation with the text message.
    public enum AvatarAlignment {
        /// When auto, the text alignment will be according if the message was sent by the current user or not.
        /// If the message was sent by the current user, it will be aligned to the right, if not, to the left.
        case auto
        /// The avatar will be aligned to the left, and the message content on the right.
        case left
        /// The avatar will be aligned to the right, and the message content on the left
        case right
    }

    /// The content of this view, composed by the quoted message and the desired avatar alignment.
    public var content: (message: _ChatMessage<ExtraData>?, avatarAlignment: AvatarAlignment)? {
        didSet {
            updateContentIfNeeded()
        }
    }
    
    /// Default avatar view size. Subclass this view and override this property to change the size.
    open var authorAvatarViewSize: CGSize { .init(width: 24, height: 24) }

    /// Default attachment preview size. Subclass this view and override this property to change the size.
    open var attachmentPreviewSize: CGSize { .init(width: 34, height: 34) }

    /// The `UIStackView` that acts as a container view.
    public private(set) lazy var container: UIStackView = UIStackView()
        .withoutAutoresizingMaskConstraints

    /// The `UIView` that holds the textView.
    public private(set) lazy var contentView: UIView = UIView()
        .withoutAutoresizingMaskConstraints

    /// The `UITextView` that contains quoted message content.
    public private(set) lazy var textView: UITextView = UITextView()
        .withoutAutoresizingMaskConstraints

    /// The avatar view of the author's quoted message.
    public private(set) lazy var authorAvatarView: ChatAvatarView = uiConfig
        .avatarView.init()
        .withoutAutoresizingMaskConstraints

    /// The attachment preview view if the quoted message has an attachment.
    public private(set) lazy var attachmentPreview: UIImageView = UIImageView()
        .withoutAutoresizingMaskConstraints

    /// The `ChatChannelListItemView` layout constraints.
    public struct Layout {
        public var containerConstraints: [NSLayoutConstraint] = []
        public var authorAvatarViewConstraints: [NSLayoutConstraint] = []
        public var attachmentPreviewWidthConstraint: NSLayoutConstraint?
        public var attachmentPreviewHeightConstraint: NSLayoutConstraint?
        public var attachmentPreviewLeadingConstraint: NSLayoutConstraint?
        public var attachmentPreviewConstraints: [NSLayoutConstraint] = []
        public var textViewConstraints: [NSLayoutConstraint] = []
    }

    /// The `ChatChannelListItemView` layout constraints.
    public private(set) var layout = Layout()

    override open func setUp() {
        super.setUp()

        textView.isEditable = false
        textView.dataDetectorTypes = .link
        textView.isScrollEnabled = false
        textView.adjustsFontForContentSizeCategory = true
        textView.isUserInteractionEnabled = false
    }

    override public func defaultAppearance() {
        textView.textContainer.maximumNumberOfLines = 6
        textView.textContainer.lineBreakMode = .byTruncatingTail
        textView.textContainer.lineFragmentPadding = .zero

        textView.backgroundColor = .clear
        textView.font = uiConfig.font.subheadline
        textView.textContainerInset = .zero
        textView.textColor = uiConfig.colorPalette.text

        authorAvatarView.contentMode = .scaleAspectFit

        attachmentPreview.layer.cornerRadius = attachmentPreviewSize.width / 4
        attachmentPreview.layer.masksToBounds = true

        contentView.layer.cornerRadius = 16
        contentView.layer.borderWidth = 1
        contentView.layer.borderColor = uiConfig.colorPalette.border.cgColor
        contentView.layer.masksToBounds = true
    }

    override open func setUpLayout() {
        preservesSuperviewLayoutMargins = true

        container.spacing = UIStackView.spacingUseSystem
        container.alignment = .bottom

        addSubview(container)
        container.addArrangedSubview(authorAvatarView)
        container.addArrangedSubview(contentView)
        contentView.addSubview(attachmentPreview)
        contentView.addSubview(textView)

        layout.containerConstraints = [
            container.leadingAnchor.pin(equalTo: leadingAnchor, constant: directionalLayoutMargins.leading),
            container.trailingAnchor.pin(equalTo: trailingAnchor, constant: -directionalLayoutMargins.trailing),
            container.topAnchor.pin(equalTo: topAnchor, constant: directionalLayoutMargins.top),
            container.bottomAnchor.pin(equalTo: bottomAnchor, constant: -directionalLayoutMargins.bottom)
        ]

        layout.authorAvatarViewConstraints = [
            authorAvatarView.widthAnchor.pin(equalToConstant: authorAvatarViewSize.width),
            authorAvatarView.heightAnchor.pin(equalToConstant: authorAvatarViewSize.height)
        ]

        layout.attachmentPreviewConstraints = [
            attachmentPreview.widthAnchor.pin(equalToConstant: attachmentPreviewSize.width),
            attachmentPreview.heightAnchor.pin(equalToConstant: attachmentPreviewSize.height),
            attachmentPreview.leadingAnchor.pin(
                equalTo: contentView.leadingAnchor,
                constant: contentView.directionalLayoutMargins.leading
            ),
            attachmentPreview.topAnchor.pin(equalTo: contentView.topAnchor, constant: contentView.directionalLayoutMargins.top),
            attachmentPreview.bottomAnchor.pin(
                lessThanOrEqualTo: contentView.bottomAnchor,
                constant: -contentView.directionalLayoutMargins.bottom
            )
        ]

        layout.attachmentPreviewWidthConstraint = layout.attachmentPreviewConstraints[0]
        layout.attachmentPreviewHeightConstraint = layout.attachmentPreviewConstraints[1]
        layout.attachmentPreviewLeadingConstraint = layout.attachmentPreviewConstraints[2]

        layout.textViewConstraints = [
            textView.topAnchor.pin(equalTo: contentView.topAnchor, constant: contentView.directionalLayoutMargins.top),
            textView.trailingAnchor.pin(
                equalTo: contentView.trailingAnchor,
                constant: -contentView.directionalLayoutMargins.trailing
            ),
            textView.bottomAnchor.pin(
                lessThanOrEqualTo: contentView.bottomAnchor,
                constant: -contentView.directionalLayoutMargins.bottom
            ),
            textView.leadingAnchor.pin(equalToSystemSpacingAfter: attachmentPreview.trailingAnchor, multiplier: 1)
        ]

        NSLayoutConstraint.activate(
            layout.containerConstraints
                + layout.authorAvatarViewConstraints
                + layout.attachmentPreviewConstraints
                + layout.textViewConstraints
        )
    }

    override open func updateContent() {
        guard let message = content?.message else { return }
        guard let avatarAlignment = content?.avatarAlignment else { return }

        setAvatar(imageUrl: message.author.imageURL)
        setText(message.text)
        setAttachmentPreview(for: message)

        switch avatarAlignment {
        case .auto:
            if message.isSentByCurrentUser {
                setAvatarPosition(.right)
            } else {
                setAvatarPosition(.left)
            }
        case .left:
            setAvatarPosition(.left)
        case .right:
            setAvatarPosition(.right)
        }
    }
}

private extension _ChatMessageQuoteView {
    /// Sets the avatar image from a url or sets the placeholder image if the url is `nil`.
    /// - Parameter imageUrl: The url of the image.
    func setAvatar(imageUrl: URL?) {
        let placeholder = uiConfig.images.userAvatarPlaceholder1
        authorAvatarView.imageView.loadImage(from: imageUrl, placeholder: placeholder)
    }

    /// Sets the text of the `textView`.
    /// - Parameter text: The content of the text view.
    func setText(_ text: String) {
        textView.text = text
    }

    /// The avatar position in relation of the text bubble.
    enum AvatarPosition {
        case left
        case right
    }

    /// Sets the avatar position in relation of the text bubble.
    /// - Parameter position: The avatar position.
    func setAvatarPosition(_ position: AvatarPosition) {
        authorAvatarView.removeFromSuperview()
        switch position {
        case .left:
            container.insertArrangedSubview(authorAvatarView, at: 0)
            contentView.layer.maskedCorners = [
                .layerMinXMinYCorner,
                .layerMaxXMinYCorner,
                .layerMaxXMaxYCorner
            ]
        case .right:
            container.addArrangedSubview(authorAvatarView)
            contentView.layer.maskedCorners = [
                .layerMinXMinYCorner,
                .layerMaxXMinYCorner,
                .layerMinXMaxYCorner
            ]
        }
    }

    /// Sets the attachment view or hides it if no attachment found in the message.
    /// - Parameter message: The message owner of the attachment.
    func setAttachmentPreview(for message: _ChatMessage<ExtraData>) {
        // TODO: Take last attachment when they'll be ordered.
        guard let attachment = message.attachments.first else {
            attachmentPreview.image = nil
            hideAttachmentPreview()
            return
        }

        switch attachment.type {
        case .file:
            // TODO: Question for designers.
            // I'm not sure if it will be possible to provide specific icon for all file formats
            // so probably we should stick to some generic like other apps do.
            print("set file icon")
            showAttachmentPreview()
            attachmentPreview.contentMode = .scaleAspectFit
        default:
            let attachment = attachment as? ChatMessageDefaultAttachment
            if let previewURL = attachment?.imagePreviewURL ?? attachment?.imageURL {
                attachmentPreview.loadImage(from: previewURL)
                showAttachmentPreview()
                attachmentPreview.contentMode = .scaleAspectFill
                // TODO: When we will have attachment examples we will set smth
                // different for different types.
                if message.text.isEmpty, attachment?.type == .image {
                    textView.text = "Photo"
                }
            } else {
                attachmentPreview.image = nil
                hideAttachmentPreview()
            }
        }
    }

    /// Show the attachment preview view.
    func showAttachmentPreview() {
        layout.attachmentPreviewWidthConstraint?.constant = attachmentPreviewSize.width
        layout.attachmentPreviewHeightConstraint?.constant = attachmentPreviewSize.height
        layout.attachmentPreviewLeadingConstraint?.constant = contentView.directionalLayoutMargins.leading
    }

    /// Hide the attachment preview view.
    func hideAttachmentPreview() {
        layout.attachmentPreviewWidthConstraint?.constant = 0
        layout.attachmentPreviewHeightConstraint?.constant = 0
        layout.attachmentPreviewLeadingConstraint?.constant = 0
    }
}
