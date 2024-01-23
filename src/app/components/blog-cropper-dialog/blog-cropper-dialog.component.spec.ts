import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCropperDialogComponent } from './blog-cropper-dialog.component';

describe('BlogCropperDialogComponent', () => {
  let component: BlogCropperDialogComponent;
  let fixture: ComponentFixture<BlogCropperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCropperDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCropperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
