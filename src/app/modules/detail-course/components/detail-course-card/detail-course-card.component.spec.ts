import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCourseCardComponent } from './detail-course-card.component';

describe('DetailCourseCardComponent', () => {
  let component: DetailCourseCardComponent;
  let fixture: ComponentFixture<DetailCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCourseCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
