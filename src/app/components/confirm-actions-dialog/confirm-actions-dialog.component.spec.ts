import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmActionsDialogComponent } from './confirm-actions-dialog.component';

describe('ConfirmActionsDialogComponent', () => {
  let component: ConfirmActionsDialogComponent;
  let fixture: ComponentFixture<ConfirmActionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmActionsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
