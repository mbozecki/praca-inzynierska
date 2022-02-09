import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeatDialogComponent } from './add-beat-dialog.component';

describe('AddBeatDialogComponent', () => {
  let component: AddBeatDialogComponent;
  let fixture: ComponentFixture<AddBeatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBeatDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBeatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
