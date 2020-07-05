import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatMenuModule, MatToolbarModule, MatDialogModule, MatDialogRef } from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatMenuModule,
        MatToolbarModule,
        MatDialogModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('setDifficulty() should correctly change difficulty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.setDifficulty('Medium');
    expect(app.selectedDifficulty).toEqual('Medium');
  });

  it('resetGame() should reset all variables', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.setDifficulty('Medium');
    expect(app.selectedDifficulty).toEqual('Medium');
    expect(app.gameOver).toEqual(false);
    expect(app.revealMineLocations).toEqual(false);
  });
});
