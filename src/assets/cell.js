class Cell {
    constructor(value, x, y, box, table, needFill = false) {
        this.x = x;
        this.y = y;
        this.box = box;
        this.weights = 100;
        this.value = value === undefined ? undefined : String(value);
        this.table = table;
        // 需要被填充
        this.needFill = needFill;
        // 提示
        this.hint = false;
        // 允许被填充
        this.allowFill = true;
    }

    setBlank() {
        this.value = undefined;
        // 当前盒子内的全部单元格权重减一
        this.box.getCells().filter(cell => cell.value !== undefined)
            .forEach(cell => cell.weights = cell.weights - 1);
        // 当前行的所有当前格权重 -1
        this.table.getCells().filter(cell => cell.x === this.x && cell.value !== undefined)
            .forEach(cell => cell.weights = cell.weights - 1);
        // 当前列的所有单元格权重 -1
        this.table.getCells().filter(cell => cell.y === this.y && cell.value !== undefined)
            .forEach(cell => cell.weights = cell.weights - 1);
        // 当前权重权重为0
        // this.weights = 0;
        this.needFill = true;
    }


    static filterCellsByBoxPosition(x, y, cells) {
        if (x < 0 || x > 2) {
            throw new Error("x不在范围内")
        }
        if (y < 0 || y > 2) {
            throw new Error("x不在范围内")
        }
        let result = []
        if (x === 0) {
            result = cells.filter(cell => cell.x >= 0 && cell.x < 3)
        } else if (x === 1) {
            result = cells.filter(cell => cell.x > 2 && cell.x < 6)
        } else if (x === 2) {
            result = cells.filter(cell => cell.x > 5 && cell.x <= 9)
        }

        if (y === 0) {
            result = result.filter(cell => cell.y >= 0 && cell.y < 3)
        } else if (y === 1) {
            result = result.filter(cell => cell.y > 2 && cell.y < 6)
        } else if (y === 2) {
            result = result.filter(cell => cell.y > 5 && cell.y <= 9)
        }
        return result;
    }
}

export default Cell