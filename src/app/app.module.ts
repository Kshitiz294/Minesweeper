import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatMenuModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { MinesweeperRulesComponent } from './minesweeper-rules/minesweeper-rules.component';

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperRulesComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MinesweeperRulesComponent]
})
export class AppModule { }
