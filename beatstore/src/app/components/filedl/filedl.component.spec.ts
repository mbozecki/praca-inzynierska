import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledlComponent } from './filedl.component';

describe('FiledlComponent', () => {
  let component: FiledlComponent;
  let fixture: ComponentFixture<FiledlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiledlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
