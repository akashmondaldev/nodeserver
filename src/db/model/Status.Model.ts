import { DataTypes } from 'sequelize';
import sequelize from '../db';
import UserModel from './User.Model';

const StatusModel = sequelize.define("Status", {
    caption: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    statusSeen:{
        type: DataTypes.JSON,
        allowNull: true,
    },
    createdDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
})

StatusModel.belongsTo(UserModel, { foreignKey: 'authorId' });
export default StatusModel;