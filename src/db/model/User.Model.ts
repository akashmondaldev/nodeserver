import { DataTypes } from 'sequelize';
import sequelize from '../db';

const UserModel = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updatedDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    following: {
        type: DataTypes.JSON,
        allowNull: true
    },
    followers: {
        type: DataTypes.JSON,
        allowNull: true
    },
});
export default UserModel;