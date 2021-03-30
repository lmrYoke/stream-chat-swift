(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{100:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return r})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return b}));var a=n(3),i=n(7),o=(n(0),n(119)),l={title:"StreamChatUI Cheat Sheet"},r={unversionedId:"ui-cheat-sheet",id:"ui-cheat-sheet",isDocsHomePage:!1,title:"StreamChatUI Cheat Sheet",description:"This cheat sheet provides additional information on how to use StreamChatUI SDK. It offers rich code snippets, detailed explanations, and commentary on the provided solutions.",source:"@site/docs/ui-cheat-sheet.md",slug:"/ui-cheat-sheet",permalink:"/stream-chat-swift/ui-cheat-sheet",editUrl:"https://github.com/GetStream/stream-chat-swift/edit/main/stream-chat-swift-docs/docs/ui-cheat-sheet.md",version:"current"},c=[{value:"Setup",id:"setup",children:[{value:"Integrating with <code>StreamChat</code>",id:"integrating-with-streamchat",children:[]}]},{value:"Customizing views",id:"customizing-views",children:[{value:"View Lifecycle Methods",id:"view-lifecycle-methods",children:[]},{value:"Changing Main Color",id:"changing-main-color",children:[]},{value:"Changing Appearance",id:"changing-appearance",children:[]},{value:"Changing Layout",id:"changing-layout",children:[]}]}],s={toc:c};function b(e){var t=e.components,l=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,l,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This cheat sheet provides additional information on how to use ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChatUI")," SDK. It offers rich code snippets, detailed explanations, and commentary on the provided solutions."),Object(o.b)("p",null,'Some features explained here are in beta release only and will be marked with "',Object(o.b)("strong",{parentName:"p"},"\ud83c\udd71\ufe0f Beta only"),'"'),Object(o.b)("h4",{id:"summary"},"Summary"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#setup"},"Setup"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#integrating-with-streamchat"},"Integrating with ",Object(o.b)("inlineCode",{parentName:"a"},"StreamChat")),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#displaying-the-list-of-channels"},"Displaying the list of Channels")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#displaying-a-single-chat-channel"},"Displaying a single chat (Channel)")))))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#customizing-views"},"Customizing Views"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#view-lifecycle-methods"},"View Lifecycle Methods")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#changing-main-color"},"Changing Main Color")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#changing-appearance"},"Changing Appearance")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#changing-layout"},"Changing Layout"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#subclassing-components"},"Subclassing Components"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#adding-a-new-subview-to-the-ui-component"},"Adding a new subview to the UI component")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#changing-component-subviews-relative-arrangement-or-removing-subview"},"Changing component subview's relative arrangement, or removing subview")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#injecting-custom-subclass"},"Injecting Custom Subclass"))))))),Object(o.b)("hr",null),Object(o.b)("p",null,"Didn't find what you were looking for? Open an ",Object(o.b)("a",{parentName:"p",href:"https://github.com/GetStream/stream-chat-swift/issues"},"issue in our repo")," and suggest a new topic!"),Object(o.b)("hr",null),Object(o.b)("h2",{id:"setup"},"Setup"),Object(o.b)("h3",{id:"integrating-with-streamchat"},"Integrating with ",Object(o.b)("inlineCode",{parentName:"h3"},"StreamChat")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"StreamChat")," is the backbone powering the ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChatUI"),". UI SDK offers flexible components able to display data provided by ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChat"),"."),Object(o.b)("p",null,"In short, using ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChatUI")," can be summarized as: create the UI component, inject the necessary ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChat")," controller and use it. Below we will look at examples of displaying a list of chats (channels) and a single chat (channel) in detail."),Object(o.b)("h4",{id:"displaying-the-list-of-channels"},"Displaying the list of Channels"),Object(o.b)("p",null,"Displaying the list of Channels a user belongs to can be summarized in 5 steps:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Create the ",Object(o.b)("inlineCode",{parentName:"li"},"ChatClient")," instance (outlined ",Object(o.b)("a",{parentName:"li",href:"https://github.com/GetStream/stream-chat-swift/wiki/Cheat-Sheet#creating-a-new-instance-of-chat-client"},"here"),")"),Object(o.b)("li",{parentName:"ul"},"Set your user to login (outlined ",Object(o.b)("a",{parentName:"li",href:"https://github.com/GetStream/stream-chat-swift/wiki/Cheat-Sheet#setting-the-current-user"},"here"),")"),Object(o.b)("li",{parentName:"ul"},"Create the ",Object(o.b)("inlineCode",{parentName:"li"},"ChatChannelListVC"),":")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"let channelList = ChatChannelListVC()\n")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Pass a ",Object(o.b)("inlineCode",{parentName:"li"},"ChatChannelListController")," instance to ",Object(o.b)("inlineCode",{parentName:"li"},"channelList"),":")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"let channelListController = chatClient\n    .channelListController(\n        query: ChannelListQuery(\n            filter: .containMembers(\n                userIds: [chatClient.currentUserId!]\n            )\n        )\n    )\nchannelList.controller = channelListController\n")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Embed the ",Object(o.b)("inlineCode",{parentName:"li"},"channelList")," into a ",Object(o.b)("inlineCode",{parentName:"li"},"UINavigationController")," and present:")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"let navigationController = UINavigationController(rootViewController: channelList)\n// Your logic for presenting `navigationController`, for example:\nUIView.transition(with: view.window!,\n                  duration: 0.5,\n                  options: .transitionFlipFromLeft,\n                  animations: {\n                    self.view.window?.rootViewController = navigation\n                  })\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("strong",{parentName:"p"},"- \ud83c\udd71\ufe0f Beta only -")," Using a ",Object(o.b)("inlineCode",{parentName:"p"},"UINavigationController")," is not required but strongly recommended. If you don't want to use a Navigation Controller, you'd need to subclass ",Object(o.b)("inlineCode",{parentName:"p"},"ChatChannelListRouter"),", override ",Object(o.b)("inlineCode",{parentName:"p"},"func openChat")," and implement your logic for showing the chat. This is explained ",Object(o.b)("a",{parentName:"p",href:"#injecting-custom-subclass"},"here"),".")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"ChatChannelListController")," will take care of opening individual channels from this point."),Object(o.b)("p",null,"To reiterate, the process is similar for nearly all UI components ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChatUI")," SDK provides: create the component, inject the necessary ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChat")," controller, and use it."),Object(o.b)("h4",{id:"displaying-a-single-chat-channel"},"Displaying a single chat (Channel)"),Object(o.b)("p",null,"If we want to display a single chat, we can do so as:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Create the ",Object(o.b)("inlineCode",{parentName:"li"},"ChatClient")," instance (outlined ",Object(o.b)("a",{parentName:"li",href:"https://github.com/GetStream/stream-chat-swift/wiki/Cheat-Sheet#creating-a-new-instance-of-chat-client"},"here"),")"),Object(o.b)("li",{parentName:"ul"},"Set your user to login (outlined ",Object(o.b)("a",{parentName:"li",href:"https://github.com/GetStream/stream-chat-swift/wiki/Cheat-Sheet#setting-the-current-user"},"here"),")"),Object(o.b)("li",{parentName:"ul"},"Create the ",Object(o.b)("inlineCode",{parentName:"li"},"ChatChannelVC")," instance:")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"let chatChannelVC = ChatChannelVC()\n")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Pass a ",Object(o.b)("inlineCode",{parentName:"li"},"ChatChannelController")," instance to ",Object(o.b)("inlineCode",{parentName:"li"},"chatChannelVC"),":")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},'let channelController = chatClient.channelController(for: .init(type: .messaging, id: "general"))\nchatChannelVC.channelController = channelController\n')),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"If the passed Channel does not exist on the backend, it will be created after VC is presented."),Object(o.b)("ul",{parentName:"blockquote"},Object(o.b)("li",{parentName:"ul"},"Present ",Object(o.b)("inlineCode",{parentName:"li"},"chatChannelVC"),":")),Object(o.b)("pre",{parentName:"blockquote"},Object(o.b)("code",{parentName:"pre",className:"language-swift"},"// Your logic for presenting `chatChannelVC`, for example:\nshow(chatChannelVC, sender: self)\n"))),Object(o.b)("h2",{id:"customizing-views"},"Customizing views"),Object(o.b)("h3",{id:"view-lifecycle-methods"},"View Lifecycle Methods"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"- \ud83c\udd71\ufe0f Beta only -")),Object(o.b)("p",null,"To make subclassing and customization simple, almost all view components in ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChatUI")," has the following set of lifecycle methods:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"/// Main point of customization for the view functionality. It's called zero or one time(s) during the view's\n/// lifetime. Calling super implementation is required.\nfunc setUp()\n\n/// Main point of customization for the view appearance. It's called zero or one time(s) during the view's\n/// lifetime. The default implementation of this method is empty so calling `super` is usually not needed.\nfunc setUpAppearance()\n\n/// Main point of customization for the view layout. It's called zero or one time(s) during the view's\n/// lifetime. Calling super is recommended but not required if you provide a complete layout for all subviews.\nfunc setUpLayout()\n\n/// Main point of customization for the view appearance. It's called every time view's content changes.\n/// Calling super is recommended but not required if you update the content of all subviews of the view.\nfunc updateContent()\n")),Object(o.b)("h3",{id:"changing-main-color"},"Changing Main Color"),Object(o.b)("p",null,"If suitable, UI elements respect ",Object(o.b)("inlineCode",{parentName:"p"},"UIView.tintColor")," as the main (brand) color. The current ",Object(o.b)("inlineCode",{parentName:"p"},"tintColor")," depends on the tint color of the view hierarchy the UI element is presented on."),Object(o.b)("p",null,"For example, by changing the tint color of the ",Object(o.b)("inlineCode",{parentName:"p"},"UIWindow")," of the app, you can easily modify the brand color of the whole chat UI:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"class SceneDelegate: UIResponder, UIWindowSceneDelegate {\n    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {\n        guard let scene = scene as? UIWindowScene else { return }\n        scene.windows.forEach { $0.tintColor = .systemPink }\n    }\n}\n")),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"default ",Object(o.b)("inlineCode",{parentName:"th"},"tintColor")),Object(o.b)("th",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"th"},"tintColor = .systemPink")))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("img",{alt:"Chat UI with default tint color",src:n(135).default})),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("img",{alt:"Chat UI with pink tint color",src:n(136).default}))))),Object(o.b)("h3",{id:"changing-appearance"},"Changing Appearance"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"- \ud83c\udd71\ufe0f Beta only -")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"StreamChatUI")," offers a simple way of customizing the default appearance of almost every UI element using the ",Object(o.b)("inlineCode",{parentName:"p"},"DefaultAppearance")," protocol. Elements conforming to this protocol expose the ",Object(o.b)("inlineCode",{parentName:"p"},"defaultAppearance")," property which allows adding custom appearance rules."),Object(o.b)("p",null,"For example, this is the default appearance of the list of channels:"),Object(o.b)("p",null,Object(o.b)("img",{alt:"Channel list default appearance",src:n(171).default})),Object(o.b)("p",null,"We can easily change the appearance of the channel list items using the ",Object(o.b)("inlineCode",{parentName:"p"},"defaultAppearance")," API:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"var uiConfig = UIConfig.default\nuiConfig.channelList.channelListItemView.defaultAppearance.addRule {\n    $0.backgroundColor = UIColor.yellow.withAlphaComponent(0.2)\n    $0.titleLabel.textColor = .darkGray\n}\n")),Object(o.b)("p",null,Object(o.b)("img",{alt:"Channel list adjusted appearance",src:n(172).default})),Object(o.b)("p",null,"The unread count indicator now seems quite off. We can change its color, too:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"uiConfig.channelList.channelListItemSubviews.unreadCountView.defaultAppearance.addRule {\n    $0.backgroundColor = .darkGray\n}\n")),Object(o.b)("p",null,Object(o.b)("img",{alt:"Channel list adjusted appearance",src:n(173).default})),Object(o.b)("h3",{id:"changing-layout"},"Changing Layout"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"- \ud83c\udd71\ufe0f Beta only -")),Object(o.b)("p",null,"It is possible to adjust/customize the layout of any UI component in the following ways:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"add a new subview"),Object(o.b)("li",{parentName:"ul"},"remove the existed subview"),Object(o.b)("li",{parentName:"ul"},"change spacing/margins/relative subviews arrangement")),Object(o.b)("p",null,"All the customizations can be done in ",Object(o.b)("strong",{parentName:"p"},"3")," steps:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Create a subclass of the UI component"),Object(o.b)("li",{parentName:"ol"},"Override ",Object(o.b)("inlineCode",{parentName:"li"},"setUpLayout")," and apply custom layout"),Object(o.b)("li",{parentName:"ol"},"Inject created subclass via ",Object(o.b)("inlineCode",{parentName:"li"},"UIConfig"))),Object(o.b)("h4",{id:"subclassing-components"},"Subclassing Components"),Object(o.b)("p",null,"This whole section is ",Object(o.b)("strong",{parentName:"p"},"- \ud83c\udd71\ufe0f Beta only -")),Object(o.b)("h5",{id:"adding-a-new-subview-to-the-ui-component"},"Adding a new subview to the UI component"),Object(o.b)("p",null,"This type of customization is especially useful when working with custom extra-data. Whenever custom extra data contains the information that should be shown inside the UI component, it can be subclassed and extended with the new subview."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Read more about ",Object(o.b)("inlineCode",{parentName:"p"},"ExtraData")," ",Object(o.b)("a",{parentName:"p",href:"https://github.com/GetStream/stream-chat-swift/wiki/Cheat-Sheet#working-with-extra-data"},"here"))),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},'struct MyExtraData: ExtraDataTypes {\n    struct Message: MessageExtraData {\n        static let defaultValue = Self(authorWasInGoodMood: true)\n\n        let authorWasInGoodMood: Bool\n    }\n}\n\n// 1. Create custom UI component subclass.\nclass MyChatMessageMetadataView: _ChatMessageMetadataView<MyExtraData> {\n\n    // 2. Declare new subview.\n    let moodLabel = UILabel()\n\n    // 3. Override `setUpLayout` and add the new subview to the hierarchy.\n    override func setUpLayout() {\n        // Use base implementation.\n        super.setUpLayout()\n        // But also extend it with the new subview.\n        stack.addArrangedSubview(moodLabel)\n    }\n\n    // 4. Override `updateContent` and provide data for the new subview.\n    override func updateContent() {\n        // Use base implementation.\n        super.updateContent()\n        // But also provide data for the new subview.\n        moodLabel.text = message?.authorWasInGoodMood == true ? "\ud83d\ude03" : "\ud83d\ude1e"\n    }\n}\n')),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Before"),Object(o.b)("th",{parentName:"tr",align:null},"After"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("img",{alt:"No author mood",src:n(174).default})),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("img",{alt:"Author mood on",src:n(175).default}))))),Object(o.b)("p",null,"Once the custom subclass is implemented, it should be injected via ",Object(o.b)("inlineCode",{parentName:"p"},"UIConfig")," so it is used instead of base UI component."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Refer to ",Object(o.b)("a",{parentName:"p",href:"#injecting-custom-subclass"},"Injecting Custom Subclass")," chapter below for more information.")),Object(o.b)("h5",{id:"changing-component-subviews-relative-arrangement-or-removing-subview"},"Changing component subview's relative arrangement, or removing subview"),Object(o.b)("p",null,"Imagine you are not satisfied with some UI component default layout and you're looking for how to exclude a particular subview or change relative subviews arrangement."),Object(o.b)("p",null,"Let's see how it can be done by the ",Object(o.b)("inlineCode",{parentName:"p"},"ChatMessageInteractiveAttachmentView")," example:\n| Default layout  | Updated layout |\n| ------------- | ------------- |\n| ",Object(o.b)("img",{alt:"InteractiveAttachmentView-before",src:n(176).default}),"  | ",Object(o.b)("img",{alt:"InteractiveAttachmentView-after",src:n(177).default}),"  |"),Object(o.b)("p",null,"As you see, in the ",Object(o.b)("inlineCode",{parentName:"p"},"updated layout"),":"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"action buttons are arranged vertically;"),Object(o.b)("li",{parentName:"ul"},"there is no GIF title label.")),Object(o.b)("p",null,"The code-snippet that does the job:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"// 1. Create custom UI component subclass.\nclass InteractiveAttachmentView: ChatMessageInteractiveAttachmentView {\n    // 2. Override `setUpLayout` and provide custom subviews arrangement.\n    override open func setUpLayout() {\n        // 3. Add only `preview` and `actionsStackView`.\n        addSubview(preview)\n        addSubview(actionsStackView)\n\n        // 4. Make the action buttons stack vertical.\n        actionsStackView.axis = .vertical\n\n        // 5. Set up the necessary constraints.\n        NSLayoutConstraint.activate([\n            preview.leadingAnchor.constraint(equalTo: layoutMarginsGuide.leadingAnchor),\n            preview.trailingAnchor.constraint(equalTo: layoutMarginsGuide.trailingAnchor),\n            preview.topAnchor.constraint(equalTo: layoutMarginsGuide.topAnchor),\n            preview.heightAnchor.constraint(equalTo: preview.widthAnchor),\n\n            actionsStackView.topAnchor.constraint(equalTo: preview.bottomAnchor),\n            actionsStackView.leadingAnchor.constraint(equalTo: leadingAnchor),\n            actionsStackView.trailingAnchor.constraint(equalTo: trailingAnchor),\n            actionsStackView.bottomAnchor.constraint(equalTo: bottomAnchor)\n        ])\n    }\n}\n")),Object(o.b)("p",null,"Once the custom subclass is implemented it should be injected via ",Object(o.b)("inlineCode",{parentName:"p"},"UIConfig")," so it is used instead of the base UI component."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Refer to ",Object(o.b)("a",{parentName:"p",href:"#injecting-custom-subclass"},"Injecting Custom Subclass")," chapter below for more information.")),Object(o.b)("h4",{id:"injecting-custom-subclass"},"Injecting Custom Subclass"),Object(o.b)("p",null,"You can change UI behavior or add new elements by subclassing  ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChatUI")," views and injecting them in ",Object(o.b)("inlineCode",{parentName:"p"},"UIConfig"),"."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"UIConfig.default")," is used to inject custom UI component types."),Object(o.b)("p",null,"Once the new type is injected it will is used instead of the base UI component."),Object(o.b)("p",null,"In most cases the type injection should be done once and the ",Object(o.b)("inlineCode",{parentName:"p"},"application(_, didFinishLaunchingWithOptions)")," is the right place for it:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {\n    // Override point for customization after application launch.\n\n    UIConfig.default\n      .messageList\n      .messageContentSubviews\n      .attachmentSubviews\n      .interactiveAttachmentView = InteractiveAttachmentView.self\n\n    return true\n}\n")),Object(o.b)("p",null,"For example, this user really loves ducks and has a bad time without them.\n",Object(o.b)("img",{alt:"User sad without duck",src:n(178).default})),Object(o.b)("p",null,'Let\'s help him, by showing \ud83e\udd86 near message view if it contains "duck" word.\nTo achive this we would subclass ',Object(o.b)("inlineCode",{parentName:"p"},"ChatMessageContentView")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},'class DuckBubbleView: ChatMessageContentView {\n    lazy var duckView: UILabel = {\n        let label = UILabel()\n        label.translatesAutoresizingMaskIntoConstraints = false\n        label.text = "\ud83e\udd86"\n        label.font = .systemFont(ofSize: 60)\n        return label\n    }()\n\n    var incomingMessageConstraint: NSLayoutConstraint?\n    var outgoingMessageConstraint: NSLayoutConstraint?\n\n    override func setUpLayout() {\n        super.setUpLayout()\n        addSubview(duckView)\n        duckView.centerYAnchor.constraint(equalTo: messageBubbleView.bottomAnchor).isActive = true\n\n        incomingMessageConstraint = duckView.centerXAnchor.constraint(equalTo: trailingAnchor)\n        outgoingMessageConstraint = duckView.centerXAnchor.constraint(equalTo: leadingAnchor)\n    }\n\n    override func updateContent() {\n        super.updateContent()\n        let isOutgoing = message?.isSentByCurrentUser ?? false\n        incomingMessageConstraint?.isActive = !isOutgoing\n        outgoingMessageConstraint?.isActive = isOutgoing\n\n        let isDuckInIt = message?.text.contains("duck") ?? false\n        duckView.isHidden = !isDuckInIt\n    }\n}\n')),Object(o.b)("p",null,"Now to teach ",Object(o.b)("inlineCode",{parentName:"p"},"StreamChatUI")," sdk to use our \ud83e\udd86 view, pass it inside ",Object(o.b)("inlineCode",{parentName:"p"},"UIConfig")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-swift"},"UIConfig.default.messageList.messageContentView = DuckBubbleView.self\n")),Object(o.b)("p",null,Object(o.b)("img",{alt:"User now happy with duck",src:n(179).default})))}b.isMDXComponent=!0},119:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var a=n(0),i=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),b=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=b(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},h=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=b(n),h=a,m=u["".concat(l,".").concat(h)]||u[h]||p[h]||o;return n?i.a.createElement(m,r(r({ref:t},s),{},{components:n})):i.a.createElement(m,r({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=h;var r={};for(var c in t)hasOwnProperty.call(t,c)&&(r[c]=t[c]);r.originalType=e,r.mdxType="string"==typeof e?e:a,l[1]=r;for(var s=2;s<o;s++)l[s]=n[s];return i.a.createElement.apply(null,l)}return i.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},135:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/blue-tint-3f4c8d9f78b4f14f6c45a369c4771841.png"},136:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/pink-tint-8a3738017fafa51e6cd3f70f391b61fe.png"},171:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/default-appearance-1-8ab894aec554b249f5f1b4268fcc589a.png"},172:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/default-appearance-2-f63c97f0f1bc3f05861f5fa13a57f2b6.png"},173:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/default-appearance-3-72a42368ac2dcac3a6c5bd465d69f765.png"},174:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/change-layout-mood-no-9b8be0cfd0a48003966f8d08fd31a941.png"},175:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/change-layout-mood-on-a30c54b1883e34acde2eb3a396758694.png"},176:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/change-layout-cow-before-53ad6e563cda287b71c5b0044778319d.png"},177:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/change-layout-cow-after-1e80a44ab3d0a667373f02385c4c4b60.png"},178:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/sad_duck-3551492531fb4c22069c93a6c7b326ea.png"},179:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/happy_duck-f9146ae844c600f59d0dd3924566c55f.png"}}]);