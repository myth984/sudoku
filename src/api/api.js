import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
    env: "myth-8ghne7lfb3b2968a"
});
const db = app.database();


const chartSocket = new WebSocket("ws://service-66x1nfgh-1252739196.bj.apigw.tencentcs.com/release/websocket");

function insertTable(code, data) {
    getOnlineTable().then(res => {
        let id = res.data[0]._id;
        db.collection("Table").doc(id).set({
            code: code,
            data: {
                cells: data.getCells().map(cell => {
                    return {
                        x: cell.x,
                        y: cell.y,
                        value: cell.value,
                        needFill: cell.needFill
                    }
                })
            }
        }).then(res => {
            console.log(res);
            console.log("生成新的table成功");
        })
    })
}

function getOnlineTable() {
    return db.collection("Table").where({}).get()
}


/**
 * 更新table
 */
function updateTable(table) {
    // 发送填空消息
    let remoteTable = table.remoteTable;
    db.collection("Table").doc(remoteTable._id).update({
        data: {
            cells: table.getCells().map(cell => {
                return {
                    x: cell.x,
                    y: cell.y,
                    value: cell.value,
                    needFill: cell.needFill
                }
            })
        }
    }).then(res => {
        console.log(res);
    })
}

function sendMsg(user, msg) {
    chartSocket.send(JSON.stringify({ user, msg }));
}


function listenTableChange(table, callBack) {
    let remoteTable = table.remoteTable;
    table.watcher = db.collection("Table").doc(remoteTable._id).watch({
        onChange() {
            callBack(this.virtualClient.sessionInfo.currentDocs[0])
        }
    })
}

function listenChartChange(callBack) {
    chartSocket.onmessage = (evt) => {
        let msgJson = JSON.parse(evt.data)
        callBack(msgJson)
    }
}


export {
    listenChartChange,
    sendMsg,
    insertTable,
    getOnlineTable,
    updateTable,
    listenTableChange
}