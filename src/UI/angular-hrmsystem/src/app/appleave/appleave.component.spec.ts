import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleaveComponent } from './appleave.component';

describe('AppleaveComponent', () => {
  let component: AppleaveComponent;
  let fixture: ComponentFixture<AppleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppleaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
