import _ from 'lodash';
class Table {
    constructor() {
        this.boxs = [];
    }

    addBox(box) {
        this.boxs.push(box)
    }

    getBoxs() {
        return this.boxs;
    }

    getCells() {
        if (this.cells !== undefined) {
            return this.cells
        } else {
            let result = []
            this.boxs.forEach((box) => {
                result = result.concat(box.getCells())
            })
            this.cells = result;
            // 建立映射关系
            this.positionMap = {};
            this.cells.forEach(cell => {
                this.positionMap[String(cell.x) + String(cell.y)] = cell
            })
            return result;
        }
    }

    findCellByPosition(xy) {
        return this.positionMap[xy];
    }

    /**
     * 获取权重最大的单元格
     * @param random 随机值 为0 则不随机 取第一个 random 越大随机性越强
     */
    getMaxWeightsCell(random = 0) {
        let cells = this.getCells().filter(cell => cell.value !== undefined);
        cells.sort((a, b) => a.weights > b.weights ? -1 : 1)
        if (random == 0) {
            return cells[0]
        }
        if (random > cells.length - 1) {
            random = cells.length - 1;
        }
        let index = _.random(0, random, false)
        return cells[index];
    }

    getRowCells(x) {
        return this.getCells().filter(cell => cell.x === x);
    }

    getColumnCells(y) {
        return this.getCells().filter(cell => cell.y === y);
    }

    verify(cell) {
            // 验证当前盒子是否有重复
            let box = cell.box;
            let cells = box.getCells().filter(i => {
                // 去除自身
                return (i.x !== cell.x || i.y !== cell.y)
            })
            for (let i of cells) {
                // 如果有相同的值则验证失败
                if (i.value === cell.value) {
                    return false;
                }
            }
            // 验证当前行是否有重复
            let rowCells = this.getRowCells(cell.x).filter(i => {
                // 去除自身
                return (i.x !== cell.x || i.y !== cell.y)
            })
            for (let i of rowCells) {
                // 如果有相同的值则验证失败
                if (i.value === cell.value) {
                    return false;
                }
            }
            // 验证当前列是否有重复
            let columnCells = this.getColumnCells(cell.y).filter(i => {
                // 去除自身
                return (i.x !== cell.x || i.y !== cell.y)
            })
            for (let i of columnCells) {
                // 如果有相同的值则验证失败
                if (i.value === cell.value) {
                    return false;
                }
            }
            return true;
        }
        // 验证是否通关
    verifyPass() {
        let cells = this.getCells();
        for (let cell of cells) {
            if (cell.value === undefined) {
                return false;
            }
            if (this.verify(cell) === false) {
                return false;
            }
        }
        return true;

    }
}

export default Table