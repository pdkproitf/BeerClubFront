import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportsComponent } from './passports.component';

describe('PassportsComponent', () => {
  let component: PassportsComponent;
  let fixture: ComponentFixture<PassportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
