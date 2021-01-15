import _ from 'lodash';
import Cell from './cell';
import Box from './box';
import Table from './table';
const startTable = [
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
    // 横向打乱
    for (let i = 0; i < 3; i++) {
        let row = rows[i];
        // 获得随机行
        let r = _.random(0, 2, false);
        // 移除这个随机行
        _.pullAt(row, r);
        // 交换剩余两行的
        [startTable[row[0]], startTable[row[1]]] = [startTable[row[1]], startTable[row[0]]]
    }
    // 纵向打乱
    for (let i = 0; i < 3; i++) {
        let column = columns[i];
        // 获得随机列
        let r = _.random(0, 2, false);
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
    })
    return table;
};
/**
 *
 * @param num 需要填的空
 */
const getBlankTable = (num = 2) => {
    let table = getFinalTable();
    // if (num < 9) {
    //     throw new Error("你别玩了")
    // }
    for (let i = 0; i < num; i++) {
        let cell = table.getMaxWeightsCell(5);
        cell.setBlank();
    }
    return table;
}
export {
    getBlankTable,
    getFinalTable
}