import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigsComponent } from './pigs.component';

describe('PigsComponent', () => {
  let component: PigsComponent;
  let fixture: ComponentFixture<PigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
