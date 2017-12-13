import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PirhistoryComponent } from './pirhistory.component';

describe('PirhistoryComponent', () => {
  let component: PirhistoryComponent;
  let fixture: ComponentFixture<PirhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PirhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PirhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
