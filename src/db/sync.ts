import CommentModel from "./model/Comments.Model";
import ConversationModel from "./model/Conversation.Model";
import PostModel from "./model/Post.Model";
import StatusModel from "./model/Status.Model";
import UserModel from "./model/User.Model";



const ModelSync = async () => {
    // await UserModel.sync().then(() => {
    //     console.log("User table created")
    // });
    // await PostModel.sync().then(() => {
    //     console.log("Post table created")
    // });
    // await CommentModel.sync().then(() => {
    //     console.log("Comment table created")
    // })
    // await StatusModel.sync().then(() => {
    //     console.log("Image table created")
    // })
    // await ConversationModel.sync().then(() => {
    //     console.log("Conversation table created")
    // })
    console.log("All tables synced")
}

export default ModelSync;