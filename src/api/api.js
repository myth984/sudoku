const { Realtime } = require('leancloud-realtime');
const AV = require('leancloud-storage/live-query');
import _ from "lodash"
// const { Query, User } = AV;
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



function login(name) {
    let user = realtime.createIMClient(name);
    return user;
}

function queryChartRoom(user) {
    var query = user.getQuery().equalTo('tr', true);
    return query.find();
}

function insertTable(code, data) {
    const Table = AV.Object.extend('Table');
    const table = new Table();
    let saveData = _.cloneDeep(data);
    delete saveData.positionMap;
    table.set("code", code);
    table.set("data", {
        cells: data.getCells().map(cell => {
            return {
                x: cell.x,
                y: cell.y,
                value: cell.value,
                needFill: cell.needFill
            }
        })
    });
    table.save().then((todo) => {
        // 成功保存之后，执行其他逻辑
        console.log(`保存成功。objectId：${todo.id}`);
    }, (error) => {
        // 异常处理
        console.log("失败了")
        console.error(error);
    });
}

function getOnlineTable() {
    const query = new AV.Query('Table');
    return query.first();
}


/**
 * 更新table
 */
function updateTable(table) {
    // 发送填空消息
    let remoteTable = table.remoteTable
    remoteTable.set("data", {
        cells: table.getCells().map(cell => {
            return {
                x: cell.x,
                y: cell.y,
                value: cell.value,
                needFill: cell.needFill
            }
        })
    });
    remoteTable.save().then((todo) => {
        // 成功保存之后，执行其他逻辑
        console.log(`保存成功。objectId：${todo.id}`);
    }, (error) => {
        // 异常处理
        console.log("失败了")
        console.error(error);
    });
}



function listenTableChange(callBack) {
    const query = new AV.Query('Table');
    query.subscribe().then((liveQuery) => {
        liveQuery.on('update', (updatedTodo) => {
            callBack(updatedTodo)
        });
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