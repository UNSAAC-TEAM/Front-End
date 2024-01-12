import {Component, HostListener, OnInit} from '@angular/core';

interface Filter {
  value: string;
  viewValue: string;
}

const FILTER_OPTIONS: Filter[] = [
  { value: "recent-0", viewValue: "Mas Recientes" },
  { value: "relevant-1", viewValue: "Mas Relevante" },
  { value: "rated-2", viewValue: "Mejor Valorados" }
];
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  buttonText = "Ordenar por";
  options = FILTER_OPTIONS;
  showSidebarFilter: boolean = true;
  showCategories: boolean = true;
  showClearFilter: boolean=true;

  onSelect(option: Filter) {
    this.buttonText = option.viewValue;
  }

  toggleSidebarFilter(): void {
    this.showSidebarFilter = !this.showSidebarFilter;
  }

  showItems(bool: boolean): void{
    this.showSidebarFilter=bool;
    this.showCategories = bool;
    this.showClearFilter = bool
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const currentWidth = window.innerWidth;
    if (currentWidth < 890) {
      this.showItems(false)
    } else if (currentWidth > 890) {
      this.showItems(true)
    }
  }

}
