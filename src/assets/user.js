import { sendMsg } from "@/api/api"
class User {
    constructor(name) {
        this.name = name;
    }

    joinChartRoom(msgList) {
        this.msgList = msgList;
        this.sendMsg(`欢迎[${this.name}]光临`)
    }

    sendMsg(msg) {
        this.msgList.push(msg);
        sendMsg(this.name, msg)
    }
}
export default User