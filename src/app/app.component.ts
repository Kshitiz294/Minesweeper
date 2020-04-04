import { Component, OnInit } from '@angular/core';
import { Mine, RowColumnArray, RowColumn } from './data-model.model';
import { gameModes } from './game-modes.model';
import { MatDialog } from '@angular/material';
import { MinesweeperRulesComponent } from './minesweeper-rules/minesweeper-rules.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public mine: Mine;
  public gameOver = false;
  public totalBoxesToBeOpened: number;
  public totalMinesRemaining: number;
  public selectedDifficulty = 'Easy';
  public timer = 0;
  public timerInterval;

  private mineLocations: RowColumnArray;

  constructor(private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.resetGame();
    this.timer = 0;
    this.timerInterval = setInterval(
      () => {
        this.timer = this.timer + 1;
      },
      1000
    );
  }

  public openInstructionsDialog(): void {
    this.dialog.open(MinesweeperRulesComponent);
  }

  public setDifficulty(difficultyLevel: string) {
    this.selectedDifficulty = difficultyLevel;
    this.resetGame();
  }

  public resetGame(): void {
    this.gameOver = false;
    const selectedDifficultySetting = gameModes[this.selectedDifficulty];
    this.setUpGame(selectedDifficultySetting.rows, selectedDifficultySetting.columns, selectedDifficultySetting.mines);
  }

  public openMineBox(rowIndex: number, columnIndex: number): void {
    if (this.mine.rows[rowIndex].columns[columnIndex].isMarked) {
      return;
    }
    this.mine.rows[rowIndex].columns[columnIndex].isOpened = true;
    // If the box contains mine, then its game-over
    if (this.mine.rows[rowIndex].columns[columnIndex].containsMine) {
      this.gameOver = true;
      clearInterval(this.timerInterval);
      return;
    }
    // Now we have one less mine box to be opened
    this.totalBoxesToBeOpened = this.totalBoxesToBeOpened - 1;
    // Check how many of the neighbouring fields have mines
    const neighbours = new RowColumnArray(rowIndex, columnIndex);
    const minesInNeigbourhood = this.countNumberOfMinesInNeighbourhood(neighbours);
    if (minesInNeigbourhood === 0) {
      this.mine.rows[rowIndex].columns[columnIndex].content = '';
      this.openNeighbouringMines(neighbours);
    } else {
      this.mine.rows[rowIndex].columns[columnIndex].content = `${minesInNeigbourhood}`;
    }

    // Check if game is over
    this.checkIfgameOver();
  }

  public toggleMarked(rowIndex: number, columnIndex: number): void {
    this.mine.rows[rowIndex].columns[columnIndex].isMarked = !this.mine.rows[rowIndex].columns[columnIndex].isMarked;
    this.mine.rows[rowIndex].columns[columnIndex].content = this.mine.rows[rowIndex].columns[columnIndex].isMarked ? 'M' : '';
    this.totalMinesRemaining = this.totalMinesRemaining -  (this.mine.rows[rowIndex].columns[columnIndex].isMarked ? +1 : -1);

    // Check if game is over
    this.checkIfgameOver();
  }

  private setUpGame(nRows: number, nColumns: number, nMines: number): void {
    this.mine = new Mine(nRows, nColumns);
    // Boxes to be opened = Grid size(row*columns) - no. of mines
    this.totalBoxesToBeOpened = (nRows * nColumns - nMines);
    this.totalMinesRemaining = nMines;
    this.setUpMines(nRows, nColumns, nMines);
  }

  private setUpMines(nRows: number, nColumns: number, nMines: number): void {
    this.mineLocations = new RowColumnArray();
    // Keep running loop as long as we don't get desired number of unique locations
    while (this.mineLocations.rowColumnArray.length < nMines) {
      const rowIndex = this.createRandomNumber(nRows);
      const columnIndex = this.createRandomNumber(nColumns);
      if (this.mineLocations.rowColumnArray.find((item) => item.row === rowIndex && item.column === columnIndex)) {
        continue;
      } else {
          this.mine.rows[rowIndex].columns[columnIndex].containsMine = true;
          this.mineLocations.rowColumnArray.push(new RowColumn(rowIndex, columnIndex));
          this.mine.rows[rowIndex].columns[columnIndex].content = 'X';
      }
    }
    // console.log(this.mineLocations);
  }

  private createRandomNumber(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private openNeighbouringMines(neighbours: RowColumnArray): void {
    for (const index of neighbours.rowColumnArray) {
      if (this.isSafeToOpen(index.row, index.column)) {
        this.openMineBox(index.row, index.column);
      }
    }
  }

  private isSafeToOpen(rowIndex: number, columnIndex: number): boolean {
    if (this.mine.rows[rowIndex] && this.mine.rows[rowIndex].columns[columnIndex]) {
      if (!this.mine.rows[rowIndex].columns[columnIndex].isOpened && !this.mine.rows[rowIndex].columns[columnIndex].containsMine) {
        return true;
      }
    }
    return false;
  }

  private countNumberOfMinesInNeighbourhood(neighbours: RowColumnArray): number {
    let count = 0;
    for (const index of neighbours.rowColumnArray) {
      if (this.containsMine(index.row, index.column)) {
        count++;
      }
    }
    return count;
  }

  private containsMine(rowIndex: number, columnIndex: number): boolean {
    if (this.mine.rows[rowIndex] && this.mine.rows[rowIndex].columns[columnIndex]) {
      if (this.mine.rows[rowIndex].columns[columnIndex].containsMine) {
        return true;
      }
    }
    return false;
  }

  private checkIfgameOver(): void {
    if (this.totalBoxesToBeOpened === 0 && this.totalMinesRemaining === 0) {
      this.gameOver = true;
      clearInterval(this.timerInterval);
    } else {
      this.gameOver = false;
    }
  }
}
