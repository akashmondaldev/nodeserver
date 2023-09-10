export interface PostType {
    id: string,
    caption: string,
    images: string[],
    authorId: string,
    likes: string[],
    comments: PostComment[]
}

export interface PostComment {
    id: string,
    authorId: string,
    content: string,
    likes: string[]
}