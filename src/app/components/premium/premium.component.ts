import {Component, ViewChild, ElementRef, HostListener} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";

const smallMediaQuery = window.matchMedia('(max-width: 770px)');
const mediumMediaQuery = window.matchMedia('(min-width: 771px) and (max-width: 1500px)');
export interface Course {
  id: number;
  title: string;
  imgUrl: string;
  teacher: string;
  rating: string;
  hours: string;
  difficulty: string;
  price: string;
}

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent{
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  slider: KeenSliderInstance | null = null;
  currentSlide: number = 1;


  courses: Course[] = [
    {
      id: 1,
      title: 'Curso de Angular',
      imgUrl: 'https://cdn.discordapp.com/attachments/793721172285849600/1193239787172266094/image.png?ex=65abfe26&is=65998926&hm=b4e373db920520a5c1b41d0176ddbd431b514c44f98fcf31669ab923d8e8b6b8&',
      teacher: 'Profesor Angular',
      rating: '4.5',
      hours: '30',
      difficulty: 'Intermedio',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Curso de TypeScript',
      imgUrl: 'https://cdn.discordapp.com/attachments/793721172285849600/1193239787172266094/image.png?ex=65abfe26&is=65998926&hm=b4e373db920520a5c1b41d0176ddbd431b514c44f98fcf31669ab923d8e8b6b8&',
      teacher: 'Profesor TypeScript',
      rating: '2.0',
      hours: '20',
      difficulty: 'Principiante',
      price: 'Paid'
    },
    {
      id: 3,
      title: 'Curso de Angular',
      imgUrl: 'https://cdn.discordapp.com/attachments/793721172285849600/1193239787172266094/image.png?ex=65abfe26&is=65998926&hm=b4e373db920520a5c1b41d0176ddbd431b514c44f98fcf31669ab923d8e8b6b8&',
      teacher: 'Profesor Angular',
      rating: '5',
      hours: '30',
      difficulty: 'Intermedio',
      price: 'Free'
    },
    {
      id: 4,
      title: 'Curso de TypeScript',
      imgUrl: 'https://cdn.discordapp.com/attachments/793721172285849600/1193239787172266094/image.png?ex=65abfe26&is=65998926&hm=b4e373db920520a5c1b41d0176ddbd431b514c44f98fcf31669ab923d8e8b6b8&',
      teacher: 'Profesor TypeScript',
      rating: '3.5',
      hours: '20',
      difficulty: 'Principiante',
      price: 'Paid'
    },
  ];

  ngAfterViewInit() {
     this.initSlider()
  }

  ngOnInit(): void {}


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

  getRange(n: string): number[] {
    const number = parseFloat(n);
    return Array.from({ length: number }, (_, index) => index + 1);
  }

}
