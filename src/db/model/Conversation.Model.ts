import { DataTypes } from 'sequelize';
import sequelize from '../db';

const ConversationModel = sequelize.define("Conversation", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    messageData: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    isGroup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    groupData: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    usersId: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    lastMessage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastMessageTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    lastMessageAuthor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    updatedDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
})


export default ConversationModel;