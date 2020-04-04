import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-minesweeper-rules',
  templateUrl: './minesweeper-rules.component.html',
  styleUrls: ['./minesweeper-rules.component.scss']
})
export class MinesweeperRulesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MinesweeperRulesComponent>) { }

  ngOnInit() {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
