import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgbaCoordinatorComponent } from './rgba-coordinator.component';

describe('RgbaCoordinatorComponent', () => {
  let component: RgbaCoordinatorComponent;
  let fixture: ComponentFixture<RgbaCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgbaCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgbaCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
