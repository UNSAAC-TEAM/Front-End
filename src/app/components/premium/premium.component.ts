import {Component, ViewChild, ElementRef, HostListener} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";

const smallMediaQuery = window.matchMedia('(max-width: 770px)');
const mediumMediaQuery = window.matchMedia('(min-width: 771px) and (max-width: 1500px)');


@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent{
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  slider: KeenSliderInstance | null = null;
  currentSlide: number = 1
  ngAfterViewInit() {
     this.initSlider()
  }

  private calculatePerView(): number {
    if (smallMediaQuery.matches) {
      return 1; // Menos de 600px
    } else if (mediumMediaQuery.matches) {
      return 2; // Entre 601px y 900px
    } else {
      return 4; // Más de 900px
    }

  }
  private initSlider() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      slides: {
        perView: this.calculatePerView(),
        spacing: 15,
      },
      initial: this.currentSlide,
      slideChanged: (s) => {
        this.currentSlide = s.track.details.rel;
      },
    });
  }

  private updateSliderPerView() {
    // Actualiza el número de perView en función del tamaño de la pantalla
    if (this.slider) {
      this.slider.destroy();
      this.initSlider();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateSliderPerView();
  }


  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

  ngOnInit(): void {}

}
