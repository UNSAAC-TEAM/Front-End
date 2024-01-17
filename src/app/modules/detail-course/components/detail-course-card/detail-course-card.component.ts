import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-detail-course-card',
  templateUrl: './detail-course-card.component.html',
  styleUrls: ['./detail-course-card.component.css']
})
export class DetailCourseCardComponent implements OnInit {
  hideImage = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const matCardElement = this.el.nativeElement.querySelector('.mat-card');

    const triggerHeight = 200;
    const triggerFixed = 1700;
    this.hideImage = window.scrollY > triggerHeight;
    if (scrollPosition > triggerFixed) {
      this.renderer.addClass(this.el.nativeElement.querySelector('.mat-card'), 'scrolled');


    } else {
      this.renderer.removeClass(this.el.nativeElement.querySelector('.mat-card'), 'scrolled');

      this.hideImage = scrollPosition > triggerHeight;

    }
  }

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {

  }

}
