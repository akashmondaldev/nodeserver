/* eslint-disable @typescript-eslint/no-explicit-any */
import uuid4 from "uuid4";
import sequelize from "../db/db";
import UserModel from "../db/model/User.Model";
import bcrypt from "bcrypt";
const saltRounds = 10;
const secret: string = "secret";
import jwt from "jsonwebtoken";


const getUsers = async () => {
    try {
        const users = await UserModel.findAll()
        return users
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const getUserById = async (id: string) => {
    try {
        const user = await UserModel.findOne({ where: { id: id } })
        return user
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const getUserByToken = async (token: string) => {
    try {
        const verify = jwt.verify(token, secret) as { id: string }
        if (!verify?.id) {
            return new Error("Invalid Token")
        }
        const user = await UserModel.findOne({
            where: {
                id: verify?.id
            }
        })
        return user
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const register = async (data: {
    email: string,
    password: string,
    avatar: string,
    name: string
}) => {
    try {
        const alreadyUser = await UserModel.findOne({ where: { email: data.email } })
        if (alreadyUser?.dataValues.email) {
            return new Error("User already exist")
        } else {
            const { name, email, password, avatar } = data;
            const hashPassword = await bcrypt.hash(password, saltRounds);
            const GID = uuid4();
            await UserModel.create({
                name,
                email,
                password: hashPassword,
                avatar,
                id: GID,
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
                followers: [],
                following: [],
            })
            const token = jwt.sign({ id: GID }, secret)
            return token
        }
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


const login = async (email: string, password: string) => {
    try {
        const user = await UserModel.findOne({ where: { email: email } })
        if (!user?.dataValues.email) {
            return new Error("User does not exist")
        }
        const checkPassword = await bcrypt.compare(password, user?.dataValues.password)
        if (!checkPassword) {
            return new Error("Password is incorrect")
        }
        const token = jwt.sign({ id: user?.dataValues.id }, secret)
        return token
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


const getUserByNameAndEmail = async (Text: string) => {
    try {
        const user = await sequelize.query(`SELECT * FROM users WHERE email LIKE "%${Text}%" OR name LIKE "%${Text}%"`,
            {
                model: UserModel,
                mapToModel: true,
            })
        return user
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const updateUser = async (data: {
    id: string,
    name: string,
    email: string,
    password: string,
    bio: string,
    website: string,
    avatar: string
}) => {
    try {
        await UserModel.update(data, { where: { id: data.id } })
        return "User Updated"
    } catch (error) {
        return new Error("Something went wrong")
    }
}

const deleteUser = async (id: string) => {
    try {
        await UserModel.destroy({ where: { id: id } })
        return "User Deleted"
    } catch (error) {
        return new Error("Something went wrong")
    }
}

export {
    getUsers,
    getUserById,
    getUserByNameAndEmail,
    getUserByToken,
    register,
    login,
    updateUser,
    deleteUser
}
