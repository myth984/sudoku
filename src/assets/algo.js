import _ from 'lodash';
import Cell from './cell';
import Box from './box';
import Table from './table';
import { insertTable } from "@/api/api.js";


const originalTable = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
    [3, 4, 5, 6, 7, 8, 9, 1, 2]
];
const getFinalTable = () => {
    const startTable = _.cloneDeep(originalTable)
    let rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
    let columns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
    // 用户记录生成的操作
    // r r r c c c
    let codeArr = []
        // 横向打乱
    for (let i = 0; i < 3; i++) {
        let row = rows[i];
        // 获得随机行
        let r = _.random(0, 2, false);
        // 移除这个随机行
        _.pullAt(row, r);
        codeArr.push(r);
        // 交换剩余两行的
        [startTable[row[0]], startTable[row[1]]] = [startTable[row[1]], startTable[row[0]]]
    }
    // 纵向打乱
    for (let i = 0; i < 3; i++) {
        let column = columns[i];
        // 获得随机列
        let r = _.random(0, 2, false);
        // 移除这个随机列
        codeArr.push(r);
        _.pullAt(column, r);
        for (let row of startTable) {
            [row[column[0]], row[column[1]]] = [row[column[1]], row[column[0]]]
        }
    }
    // 生产table对象
    let table = new Table();
    // 生成box对象
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            table.addBox(new Box(r, c))
        }
    }
    // 生成cell对象
    let cellArr = [];
    for (let x = 0; x < startTable.length; x++) {
        cellArr = cellArr.concat(startTable[x].map((value, y) => {
            return new Cell(value, x, y, undefined, table)
        }))
    }
    table.getBoxs().forEach((box) => {
        let cells = Cell.filterCellsByBoxPosition(box.x, box.y, cellArr)
        box.setCells(cells)
    })
    return { table, codeArr };
}

/**
 * 通过data生成table
 */
const generateTable = (remoteTable) => {
    let data = remoteTable.get("data").cells
    let table = new Table();
    table.code = remoteTable.get("code");
    table.remoteTable = remoteTable;
    // 生成box对象
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            table.addBox(new Box(r, c))
        }
    }

    // 生成cell对象
    let cellArr = data.map(i => {
        return new Cell(i.value, i.x, i.y, undefined, table, i.needFill)
    })

    table.getBoxs().forEach((box) => {
        let cells = Cell.filterCellsByBoxPosition(box.x, box.y, cellArr)
        box.setCells(cells)
    })
    return table;
}





const getFinalTableByCode = (code) => {
    let codeArr = code.split("");
    let rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
    let columns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
    const startTable = _.cloneDeep(originalTable)
    for (let i = 0; i < 3; i++) {
        let row = rows[i];
        // 获得随机行
        let r = codeArr.shift();
        // 移除这个随机行
        _.pullAt(row, r);
        // 交换剩余两行的
        [startTable[row[0]], startTable[row[1]]] = [startTable[row[1]], startTable[row[0]]]
    }
    // 纵向打乱
    for (let i = 0; i < 3; i++) {
        let column = columns[i];
        // 获得随机列
        let r = codeArr.shift();
        // 移除这个随机列
        _.pullAt(column, r);
        for (let row of startTable) {
            [row[column[0]], row[column[1]]] = [row[column[1]], row[column[0]]]
        }
    }

    // 生产table对象
    let table = new Table();
    // 生成box对象
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            table.addBox(new Box(r, c))
        }
    }
    // 生成cell对象
    let cellArr = [];
    for (let x = 0; x < startTable.length; x++) {
        cellArr = cellArr.concat(startTable[x].map((value, y) => {
            return new Cell(value, x, y, undefined, table)
        }))
    }
    table.getBoxs().forEach((box) => {
        let cells = Cell.filterCellsByBoxPosition(box.x, box.y, cellArr)
        box.setCells(cells)
    });
    let tmpStr = ""
    let arr = []
    codeArr.forEach((code, index) => {
        if (index % 2 == 0) {
            tmpStr = code;
        } else {
            arr.push(tmpStr + code);
        }
    });
    // 开始扣洞
    return startTable;

};
/**
 * @param num 需要填的空
 */
const getBlankTable = (num = 49) => {
    let { table, codeArr } = getFinalTable();
    for (let i = 0; i < num; i++) {
        let cell = table.getMaxWeightsCell(5);
        codeArr.push(String(cell.x) + String(cell.y));
        cell.setBlank();
    }
    let code = codeArr.join("");
    insertTable(code, table);
    return { data: table, code: code };
}

export {
    getBlankTable,
    getFinalTableByCode,
    generateTable
}