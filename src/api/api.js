const { Realtime } = require('leancloud-realtime');
const AV = require('leancloud-storage/live-query');
const realtime = new Realtime({
    appId: 'gOmqUStGjqpV2o8oMJpeq2qD-gzGzoHsz',
    appKey: 'fv1R6bFH7HBEGpIbYjhVRf0I',
    server: 'https://gomqustg.lc-cn-n1-shared.com',
});
AV.init({
    appId: "gOmqUStGjqpV2o8oMJpeq2qD-gzGzoHsz",
    appKey: "fv1R6bFH7HBEGpIbYjhVRf0I",
    serverURL: "https://gomqustg.lc-cn-n1-shared.com"
});

import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
    env: "myth-8ghne7lfb3b2968a"
});
const db = app.database();



function login(name) {
    let user = realtime.createIMClient(name);
    return user;
}

function queryChartRoom(user) {
    var query = user.getQuery().equalTo('tr', true);
    return query.find();
}

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



function listenTableChange(table, callBack) {
    let remoteTable = table.remoteTable;
    table.watcher = db.collection("Table").doc(remoteTable._id).watch({
        onChange() {
            callBack(this.virtualClient.sessionInfo.currentDocs[0])
        }
    })
}



export {
    login,
    queryChartRoom,
    insertTable,
    getOnlineTable,
    updateTable,
    listenTableChange
}