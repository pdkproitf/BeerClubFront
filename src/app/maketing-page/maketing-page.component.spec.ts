import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaketingPageComponent } from './maketing-page.component';

describe('MaketingPageComponent', () => {
  let component: MaketingPageComponent;
  let fixture: ComponentFixture<MaketingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaketingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaketingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
