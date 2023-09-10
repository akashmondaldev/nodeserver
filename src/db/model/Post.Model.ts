import { DataTypes } from 'sequelize';
import sequelize from '../db';
import UserModel from './User.Model';


const PostModel = sequelize.define("Post", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: true
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
    },
    authorId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.JSON,
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
});

PostModel.belongsTo(UserModel, { foreignKey: 'authorId' });

export default PostModel;