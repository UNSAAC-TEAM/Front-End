import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogImageControlComponent } from './blog-image-control.component';

describe('BlogImageControlComponent', () => {
  let component: BlogImageControlComponent;
  let fixture: ComponentFixture<BlogImageControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogImageControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogImageControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
