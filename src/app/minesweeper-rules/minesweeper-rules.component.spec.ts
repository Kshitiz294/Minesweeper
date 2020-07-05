import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperRulesComponent } from './minesweeper-rules.component';
import { MatDialogRef } from '@angular/material';

describe('MinesweeperRulesComponent', () => {
  let component: MinesweeperRulesComponent;
  let fixture: ComponentFixture<MinesweeperRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinesweeperRulesComponent ],
      providers: [ { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
