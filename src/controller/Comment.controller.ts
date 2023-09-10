import uuid4 from "uuid4"
import CommentModel from "../db/model/Comments.Model"


const getComments = async (id: string) => {
    try {
        const comments = await CommentModel.findAll({
            where: { postId: id }
        })
        return comments
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const createComment = async (postId: string, authorId: string, content: string) => {
    try {
        await CommentModel.create({
            id: uuid4(),
            content,
            postId,
            authorId,
            likes: [],
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        })
        return "Comment added"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const updateComment = async (id: string, content: string) => {
    try {
        await CommentModel.update({ content }, { where: { id } })
        return "Comment updated"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const deleteComment = async (id: string) => {
    try {
        await CommentModel.destroy({ where: { id } })
        return "Comment deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


const CommentLikeAndDislike = async (id: string, userId: string) => {
    
    try {
        const findComment = await CommentModel.findByPk(id)
        let commentLikes =  findComment?.dataValues.likes
        if (commentLikes?.includes(userId)) {
            commentLikes = commentLikes.filter((like: string) => like !== userId)
            await CommentModel.update({ likes: commentLikes }, { where: { id } })
            return "comment disliked"
        }else{
            commentLikes?.push(userId)
            await CommentModel.update({ likes: commentLikes }, { where: { id } })
            return "comment liked"
        }
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong") 
    }
}


export {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    CommentLikeAndDislike
}