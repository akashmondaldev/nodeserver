/* eslint-disable prefer-const */
/* eslint-disable no-unsafe-optional-chaining */
import UserModel from "../db/model/User.Model"
import { User } from "../interface/User"

const followAndUnFollow = async (AuthorId: string, followUserId: string) => {
    const authorData = await UserModel.findOne({
        where: {
            id: AuthorId
        }
    })
    const followUserData = await UserModel.findOne({
        where: {
            id: followUserId
        }
    })

    if (!authorData && !followUserData) {
        return "user not found"
    }

    if (authorData?.dataValues?.following?.includes(followUserId) || followUserData?.dataValues?.followers?.includes(AuthorId)) {
        const newAuthorFollowing = authorData?.dataValues?.following?.filter((id: string) => id !== followUserId)
        const newListFollowUser = followUserData?.dataValues?.followers?.filter((id: string) => id !== AuthorId)
        await UserModel.update({
            following: newAuthorFollowing
        }, {
            where: {
                id: AuthorId
            }
        })
        await UserModel.update({
            followers: newListFollowUser
        }, {
            where: {
                id: followUserId
            }
        })
        return "unfollow"
    } else {

        await UserModel.update({
            following: [...authorData?.dataValues?.following, followUserId]
        }, {
            where: {
                id: AuthorId
            }
        })
        await UserModel.update({
            followers: [...followUserData?.dataValues?.followers, AuthorId]
        }, {
            where: {
                id: followUserId
            }
        })
        return "follow"
    }
}

const getFollowersAndFollowingUserData = async (followersAndFollowingIds: string[]) => {
    let UserArray: User[] = []
    for (let index = 0; index < followersAndFollowingIds.length; index++) {
        const UserId = followersAndFollowingIds[index];
        const UserData = await UserModel.findOne({
            where: {
                id: UserId
            }
        })
        if (UserData) {
            UserArray.push(UserData.dataValues)
        } else {
            return []
        }
    }

    return UserArray
}

export {
    followAndUnFollow,
    getFollowersAndFollowingUserData
}