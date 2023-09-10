/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import uuid4 from "uuid4"
import sequelize from "../db/db"
import ConversationModel from "../db/model/Conversation.Model"
import { MessageType } from "../interface/MessageTypes"


/// conversation --------------------
const findUserConversation = async (userId: string) => {
    const ConversationArray = []
    try {
        const conversations = await sequelize.query(`
        SELECT * FROM msdb.conversations WHERE JSON_CONTAINS(usersId, '"${userId}"', '$');`,
            { mapToModel: true, model: ConversationModel })

        for (let index = 0; index < conversations.length; index++) {
            const element = conversations[index];
            // const friendsId = element.dataValues.usersId.filter((id: string) => id !== userId)
            const parsedConversations = element.dataValues.messageData.map((message: any) => JSON.parse(message))

            ConversationArray.push({
                ...element.dataValues,
                messageData: parsedConversations
            })
        }
        return ConversationArray
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const createConversation = async (data: {
    conversationId?: string
    users: string[]
    name?: string
    avatar?: string
    description?: string
    isGroup?: string
}) => {
    const { users, name, avatar, description, isGroup } = data
    try {
        const conversations = await sequelize.query(
            `SELECT *
            FROM msdb.conversations
            WHERE JSON_CONTAINS(usersId, '"${users[0]}"', '$') and JSON_CONTAINS(usersId, '"${users[1]}"', '$') and isGroup = false;`,
            { mapToModel: true, model: ConversationModel })

        const _is_group = isGroup === "true" ? true : false

        const createNewConversation = async () => {
            await ConversationModel.create({
                id: uuid4(),
                messageData: [],
                isGroup: _is_group,
                groupData: {
                    admin: [
                        users[0]
                    ],
                    name: name,
                    avatar: avatar,
                    description: description,
                    CreatedUser: users[0]
                },
                usersId: users,
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
            })
        }

        if (conversations.length === 0 && isGroup !== "true") {
            if (users.length === 2) {
                createNewConversation()
                return "Conversation created"
            } else {
                return "member length must be 2"
            }
        } else if (_is_group) {
            createNewConversation()
            return "Conversation created with group"
        }
        else {
            // console.log(conversations)
            return "Conversation already exist"
        }
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const UpdateConversation = async (data: {
    conversationId?: string
    users: string[]
    name?: string
    avatar?: string
    description?: string
    isGroup?: string
}) => {
    const { conversationId, name, avatar, description } = data
    try {
        await ConversationModel.update({
            groupData: {
                name: name,
                avatar: avatar,
                description: description,
                updatedDate: new Date().toISOString(),
            }
        }, {
            where: {
                id: conversationId
            }
        })
        return "Conversation updated"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const DeleteConversation = async (conversationId: string) => {
    try {
        await ConversationModel.destroy({
            where: {
                id: conversationId
            }
        })
        return "Conversation deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

/// User -----------------------------

const addUserToConversation = async (data: {
    conversationId: string,
    usersId: string[]
}) => {
    let alreadyUserList: string[] = []
    let newJoinUserList: string[] = []
    try {
        const conversation = await ConversationModel.findOne({
            where: {
                id: data.conversationId
            }
        })
        if (conversation?.dataValues.isGroup) {
            const usersIdInGroup = conversation?.dataValues.usersId
            // if group is true then add user added in to this group
            for (let index = 0; index < data.usersId.length; index++) {
                const userId = data.usersId[index];

                if (!usersIdInGroup.includes(userId)) {
                    //! console.log(`new user ${userId} added to conversation group`)
                    newJoinUserList.push(userId)
                } else {
                    //! console.log(`user ${userId} already in conversation group`)
                    alreadyUserList.push(userId)
                }
            }

            const newUserList = [...usersIdInGroup, ...newJoinUserList]
            await ConversationModel.update({
                usersId: newUserList
            }, {
                where: {
                    id: data.conversationId
                }
            })
            return `users name {${newJoinUserList.map((i: string) => i)}} 
            added to conversation group 
            and {${alreadyUserList.map((i: string) => i)}} already in conversation group`

        } else {
            return "this not a group"
        }
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const removeUserFromConversation = async (data:
    { conversationId: string, usersId: string[] }) => {
    try {
        const conversation = await ConversationModel.findOne({
            where: {
                id: data.conversationId
            }
        })
        const usersIdInGroup = conversation?.dataValues.usersId
        // if group is true then add user to group
        const newUserList = usersIdInGroup.filter((id: string) => !data.usersId.includes(id))
        await ConversationModel.update({
            usersId: newUserList
        }, {
            where: {
                id: data.conversationId
            }
        })
        return `users name {${data.usersId.map((i: string) => i)}} removed from conversation group`
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

/// Message ----------------------------- 
const CreateAndAddMessage = async (data: MessageType) => { // TODO: add type

    try {

        await ConversationModel.update({
            messageData: sequelize.fn('JSON_ARRAY_APPEND', sequelize.col('messageData'), '$', JSON.stringify(data)),
            lastMessage: data.message,
            lastMessageTime: new Date().toISOString(),
            lastMessageAuthor: data.senderId
        }, {
            where: {
                id: data.conversationId
            }
        })

        return "message added"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


const DeleteMessage = async (
    conversationId: string,
    messageId: string[]
) => {
    try {

        const conversation = await ConversationModel.findOne({
            where: {
                id: conversationId
            }
        })
        const messages = conversation?.dataValues.messageData.map((message: any) => JSON.parse(message))

        for (let index = 0; index < messageId.length; index++) {

            const findIndex = messages.findIndex((message: any) => message.id === messageId[index]) // find index of delete message

            if (findIndex !== -1) {
                await ConversationModel.update({
                    messageData: sequelize.fn('JSON_REMOVE', sequelize.col('messageData'), `$[${findIndex}]`)
                }, {
                    where: {
                        id: conversationId
                    }
                })
            } else {
                return "Message not found"
            }
        }

        return "message deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

export {
    createConversation,
    addUserToConversation,
    removeUserFromConversation,
    findUserConversation,
    CreateAndAddMessage,
    DeleteMessage,
    DeleteConversation,
    UpdateConversation
}