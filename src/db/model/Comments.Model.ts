import { DataTypes } from 'sequelize';
import sequelize from '../db';
import UserModel from './User.Model';

const CommentModel = sequelize.define("Comment", {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    createdDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    updatedDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
});
CommentModel.belongsTo(UserModel, { foreignKey: 'authorId' });
export default CommentModel;