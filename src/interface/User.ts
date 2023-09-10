export const initialUser: User = {
    id: "",
    name: "",
    email: "",
    password: "",
    bio: "",
    website: "",
    avatar: "",
    posts: [],
    status: [],
    followers: [],
    following: [],
    conversations: [],
    createdAt: "",
    updatedAt: "",
    createdDate: "",
    updatedDate: ""
}
export interface PostType {
    id: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
    createdDate:string
    updatedDate:string
    author: User;
    likes: string[];
    comments: CommentType[];
    images: string[];
}

export interface CommentType {
    id: string;
    authorId: string;
    content: string;
    likes: string[];
    createdAt: string;
    updatedAt: string;
    createdDate:string
    updatedDate:string
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    bio: string;
    website: string;
    avatar: string;
    posts: PostType[];
    status: StatusType[];
    followers: User[];
    following: User[];
    conversations: ConversationType[];
    createdAt: string;
    updatedAt: string;
    createdDate:string
    updatedDate:string
    
}
export interface ConversationType {
    id: string;
    usersId: string[];
    messageData: MessageType[];
    isGroup: boolean;
    groupData: groupData;
    createdAt: string;
    updatedAt: string;
    createdDate:string
    updatedDate:string
    lastMessage: string;
    lastMessageTime: string;
    lastMessageAuthor: string;
    friendData?:User | null
}

export interface groupData {
    name: string;
    avatar: string;
    description: string;
    admins: string[];
    CreatedUser: string;
}

export interface MessageType {
    id: string;
    video: string[];
    message: string;
    images: string[];
    replyId: string;
    receiverId: string;
    senderId: string;
    conversationId: string;
    createdAt: string;
    updatedAt: string;
    createdDate:string
    updatedDate:string
}
export const ConversationInitialState: ConversationType = {
    id: "",
    usersId: [],
    messageData: [],
    isGroup: false,
    groupData: {
        name: "",
        avatar: "",
        description: "",
        admins: [],
        CreatedUser: ""
    },
    createdAt: "",
    updatedAt: "",
    lastMessage: "",
    lastMessageTime: "",
    lastMessageAuthor: "",
    createdDate: "",
    updatedDate: ""
}
export interface StatusType {    
    id: string;
    caption: string;
    image: string;
    createdAt: string;
    statusSeen: string[];
    comments: Comment[];
    createdDate:string
}

export interface createConversationType {
    conversationId?: string
    users: string[]
    name?: string
    avatar?: string
    description?: string
    isGroup?: string
}