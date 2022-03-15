import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeatDialogComponent } from './edit-beat-dialog.component';

describe('EditBeatDialogComponent', () => {
  let component: EditBeatDialogComponent;
  let fixture: ComponentFixture<EditBeatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBeatDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBeatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
