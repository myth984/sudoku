class Box {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cells = [];
        this.weights = 100;
    }

    addCell(cell) {
        this.cells.push(cell)
    }
    setCells(cells) {
        cells.forEach((cell) => {
            cell.box = this;
        })
        this.cells = cells;
    }

    getCells() {
        return this.cells;
    }
}

export default Box