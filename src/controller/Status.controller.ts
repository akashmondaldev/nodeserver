/* eslint-disable no-var */
import uuid4 from "uuid4"
import StatusModel from "../db/model/Status.Model"

/* eslint-disable @typescript-eslint/no-unused-vars */

const getUserAllStatus = async (authorId: string) => {
    try {
        const status = await StatusModel.findAll({
            where: {
                authorId: authorId
            }
        })
        return status
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const createUserStatus = async (data: { caption: string, image: string, authorId: string }) => {
    try {
        await StatusModel.create({
            id: uuid4(),
            caption: data.caption,
            image: data.image,
            authorId: data.authorId,
            createdDate: new Date().toISOString(),
            statusSeen: []
        })
        return "Status created"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const deleteUserStatus = async (id: string) => {
    try {
        StatusModel.destroy({
            where: {
                id: id
            }
        })
        return "Status deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


const updateSeenStatus = async (id: string, userId: string) => {
    try {
        const findStatus = await StatusModel.findOne({
            where: {
                id: id,
            }
        })
        const alreadySeen = findStatus?.dataValues.statusSeen
        if (!alreadySeen?.includes(userId)) {
            StatusModel.update({
                statusSeen: [...alreadySeen, userId]
            }, {
                where: {
                    id: id
                }
            })
            return "Status seen"
        }
        return "Already seen"

    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

export {
    getUserAllStatus,
    createUserStatus,
    deleteUserStatus,
    updateSeenStatus,
}