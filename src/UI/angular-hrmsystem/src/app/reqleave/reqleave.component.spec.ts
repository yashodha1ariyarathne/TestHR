import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqleaveComponent } from './reqleave.component';

describe('ReqleaveComponent', () => {
  let component: ReqleaveComponent;
  let fixture: ComponentFixture<ReqleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqleaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
