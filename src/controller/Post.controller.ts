/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import uuid4 from "uuid4"
import PostModel from "../db/model/Post.Model"


const getPostsByAuthorId = async (authorId: string) => {
    try {
        let posts = await PostModel.findAll({
            where: {
                authorId: authorId
            }
        })

        return posts
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
// post
const getPostById = async (id: string) => {
    try {
        let post = await PostModel.findOne({
            where: {
                id: id
            }
        })

        return post
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const getAllPosts = async () => {
    try {
        const posts = await PostModel.findAll()
        return posts
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const createPost = async (data: { caption: string, images: string[], authorId: string }) => {
    try {
        await PostModel.create({
            id: uuid4(),
            caption: data.caption,
            images: data.images,
            authorId: data.authorId,
            likes: [],
            comments: [],
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        })

        return "Post created"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const updatePost = async (data: { id: string, caption: string, images: string[] }) => {

    try {
        await PostModel.update({
            caption: data.caption,
            images: data.images,
            updatedDate: new Date().toISOString(),
        }, {
            where: {
                id: data.id
            }
        })

        return "Post updated"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const deletePost = async (PostId: string) => {
    try {
        await PostModel.destroy({
            where: {
                id: PostId
            }
        })
        return "Post deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
// like and dislike post
const likeAndDisLikePost = async (postId: string, authorId: string) => {
    try {
        // check if user already liked the post
        const findPost = await PostModel.findOne({
            where: {
                id: postId
            }
        })
        let likes = findPost?.dataValues.likes
        if (likes.includes(authorId) && findPost) {
            PostModel.update({
                likes: likes.filter((id: string) => id !== authorId)
            }, {
                where: {
                    id: postId
                }
            })
            return "Post disliked"
        } else {
            PostModel.update({
                likes: [...likes, authorId]
            }, {
                where: {
                    id: postId
                }
            })
            return "Post liked"
        }
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

export {
    createPost,
    updatePost,
    deletePost,
    likeAndDisLikePost,
    getPostById,
    getAllPosts,
    getPostsByAuthorId
}
