import uuid4 from "uuid4";
import { MessageType } from "../../interface/MessageTypes";
import pubsub from "../../graphql/pubsub";
import { CreateAndAddMessage } from "../Conversation.controller";

const MessageCreate = (data: MessageType) => {

    const newMessage: MessageType = {
        isMessage: true,
        id: uuid4(),
        createdAt: new Date().toISOString(),
        message: data.message,
        receiverId: data.receiverId,
        senderId: data.senderId,
        conversationId: data.conversationId,

        video: data.video,
        images: data.images,
        replyId: data.replyId,
        updatedAt: new Date().toISOString(),
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
    }
    // console.log(newMessage)
    if (data.isMessage === "true") {
        CreateAndAddMessage(newMessage);
        console.log(newMessage.isMessage)
    }
    console.log("this is not saved in database")
    pubsub.publish('MESSAGE_SENT', { LiveChatRoom: newMessage });
    return newMessage;
}


export { MessageCreate };