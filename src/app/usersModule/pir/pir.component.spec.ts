import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PirComponent } from './pir.component';

describe('PirComponent', () => {
  let component: PirComponent;
  let fixture: ComponentFixture<PirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
