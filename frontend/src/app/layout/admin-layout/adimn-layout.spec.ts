import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdimnLayout } from './admin-layout';

describe('AdimnLayout', () => {
  let component: AdimnLayout;
  let fixture: ComponentFixture<AdimnLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdimnLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(AdimnLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
