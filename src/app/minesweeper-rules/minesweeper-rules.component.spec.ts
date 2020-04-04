import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperRulesComponent } from './minesweeper-rules.component';

describe('MinesweeperRulesComponent', () => {
  let component: MinesweeperRulesComponent;
  let fixture: ComponentFixture<MinesweeperRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinesweeperRulesComponent ]
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
