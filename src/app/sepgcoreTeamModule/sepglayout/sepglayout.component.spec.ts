import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SepglayoutComponent } from './sepglayout.component';

describe('SepglayoutComponent', () => {
  let component: SepglayoutComponent;
  let fixture: ComponentFixture<SepglayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SepglayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SepglayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
