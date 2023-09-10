
const typeDefs = `#graphql

  type User {
    id: ID!
    # manual update
    name: String!
    email: String!
    password: String!
    bio: String
    website: String
    avatar: String
    # system update
    posts: [Post]
    status: [Status]
    followers: [User]
    following: [User]
    conversations: [Conversation]
    createdAt: String
    updatedAt: String
    updatedDate:String
    createdDate:String
  }

  type Follow{
    id: ID!
    followerId: String!
    followingId: String!
    createdAt: String
    updatedAt: String
  } 

  type Conversation{
    id: ID!
    usersId: [String]
    messageData: [Message]
    isGroup: Boolean
    groupData: groupData
    createdAt: String
    updatedAt: String
    updatedDate:String
    createdDate:String
    lastMessage: String
    lastMessageTime: String
    lastMessageAuthor: String
  }

  type groupData{
    name: String
    avatar: String
    description: String
    admins: [String!]
    CreatedUser: String
  }

  type Status{
    id: ID!
    caption: String
    image: String
    createdAt: String
    createdDate:String
    statusSeen: [String]
    comments: [Comment]
  }

  type Post{
    id: ID!
    caption: String
    createdAt: String
    updatedAt: String
    updatedDate:String
    createdDate:String
    authorId: String
    likes: [String]
    comments: [Comment]
    images: [String]
  }

  type Comment{
    id: ID!
    authorId: String
    content: String
    likes: [String]
    createdAt: String
    updatedAt: String
    updatedDate:String
    createdDate:String
  }

  type Message {
    id: ID!
    video: [String]
    message: String
    images: [String]
    replyId: String
    receiverId: String!
    senderId: String!
    conversationId: String!
    createdAt: String
    updatedAt: String
    updatedDate:String
    createdDate:String
    isMessage:String
  }

  type Query {
      #//! message queries
   userMessages(userId:String!,conversationId:String!): [Message]
    #//! users queries
    users: [User!]!
    user(id: ID!): User!
    name(name: String!): User!
    userByNameAndEmail(Text: String!): [User]
    userLoginByToken(token: String!): User!
    getUserFollowers(id: String!): [Follow]
    getUserFollowing(id: String!): [Follow]
    userLogin(email: String! password: String!): String

    #//! conversation queries
    conversations: [Conversation!]!
    conversation(userId: String!):[Conversation!]!

    #//! post queries
    posts: [Post!]!
    postById(id: ID!): Post!

    #//! status queries
    status: [Status!]!

  }

  #//? mutations
  type Mutation {
    #//! authentication   
    userRegister(
      email: String!
      name: String!
      password: String!
      avatar: String
    ): String
    userUpdate(id: ID! 
    name:String
    email:String
    password: String!
    bio: String
    website: String
    avatar: String
    ): String!
    userDelete(id: ID!): String!

    # //! follow and unFollow
    userFollowAndUnFollow(authorId:String!, followUserId:String!): String!

    #//! conversation
    conversationsCreate(users: [String!]!,
    isGroup:String!,name: String,
    avatar: String,description: String): String!
    conversationsUpdate(conversationId: String!
      name: String!,avatar: String!,description: String!
    ): String!
    conversationsDelete(conversationId: String!): String!

    #//! conversation message
    conversationsMessageAdd(
      conversationId: String!,
      text: String!
      images: [String]!
      replyId: String!
      userId: String!
       ): String!
    conversationsMessageDelete(
      conversationId: String!,
      messageId: [String!]!
    ): String!
    conversationsAddUsers(conversationId: String!, usersId: [String!]!): String!
    conversationsRemoveUsers(conversationId: String!, usersId: [String!]!): String!

    #//! post
    postCreate(
      caption: String!
      images: [String]!
      authorId: String!
    ): String!
    postUpdate(
      id: ID!
      caption: String!
    ): String!
    postDelete(id: ID!): String!
    postLikeAndDisLike(postId: String!, authorId: String!): String!
    postCommentCreate(postId: String!, authorId: String!, content: String!): String!
    postCommentDelete(commentId: String!): String!
    postCommentUpdate(commentId: String!, content: String!): String!
    commentLikeAndDisLike(commentId: String!, authorId: String!): String!
    
    #//! status
    statusCreate(
      caption: String!
      image: String!
      authorId: String!
    ): String!
    statusSeenUpdate(statusId: String!, userId: String!): String!
    statusDelete(id: ID!): String!
    statusCreateComment(statusId: String!, authorId: String!, content: String!): String!

    #//! message
    sendMessage(
    video: [String]!
    message: String!
    images: [String]!
    replyId: String!
    receiverId: String!
    senderId: String!
    conversationId: String!
    isMessage:String!
      ): Message
  }
  
  type Subscription {
    LiveChatRoom(conversationId: String,authorId:String): Message
  }`;

export default typeDefs;