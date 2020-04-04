export class MineBox {
    public content: string;
    public containsMine: boolean;
    public isOpened: boolean;
    public isMarked: boolean;
    constructor() {
        this.content = '';
        this.containsMine = false;
        this.isOpened = false;
        this.isMarked = false;
    }
}

export class MineBoxColumn {
    public columns: MineBox[];
    constructor(nColumns: number) {
        this.columns = [];
        for (let i = 1; i <= nColumns; i++) {
            const column = new MineBox();
            this.columns.push(column);
        }
    }
}

export class Mine {
    public rows: MineBoxColumn[];
    constructor(nRows: number, nColumns: number) {
        this.rows = [];
        for (let i = 1; i <= nRows; i++) {
            const column = new MineBoxColumn(nColumns);
            this.rows.push(column);
        }
    }
}

export class RowColumn {
    constructor(public row: number, public column: number) { }
}

export class RowColumnArray {
    public rowColumnArray: RowColumn[];
    constructor(rowIndex?: number, columnIndex?: number) {
        this.rowColumnArray = [];
        if (rowIndex !== undefined && columnIndex !== undefined) {
            this.rowColumnArray.push(new RowColumn(rowIndex - 1, columnIndex - 1));
            this.rowColumnArray.push(new RowColumn(rowIndex - 1, columnIndex));
            this.rowColumnArray.push(new RowColumn(rowIndex - 1, columnIndex + 1));
            this.rowColumnArray.push(new RowColumn(rowIndex, columnIndex - 1));
            this.rowColumnArray.push(new RowColumn(rowIndex, columnIndex + 1));
            this.rowColumnArray.push(new RowColumn(rowIndex + 1, columnIndex - 1));
            this.rowColumnArray.push(new RowColumn(rowIndex + 1, columnIndex));
            this.rowColumnArray.push(new RowColumn(rowIndex + 1, columnIndex + 1));
        }
    }
}


