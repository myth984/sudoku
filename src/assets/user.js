import { login, queryChartRoom } from "@/api/api";
const { TextMessage } = require('leancloud-realtime');
class User {
    constructor(name) {
        this.name = name;
    }
    async login() {
        this.data = await login(this.name);
    }

    async joinChartRoom(msgList) {
        console.log("开始加入聊天室");
        let chatRoom = await queryChartRoom(this.data)
        chatRoom = chatRoom[0]
        this.conversation = await this.getConversation(chatRoom);
        this.msgList = msgList;
        this.conversation.join().then(() => {
            this.sendMsg("欢迎[" + this.name + "]光临")
        })
    }

    async getConversation(chatRoom) {
        return this.data.getConversation(chatRoom.id)
    }
    sendMsg(msg) {
        this.msgList.push(msg);
        return this.conversation.send(new TextMessage(msg));
    }
}
export default User