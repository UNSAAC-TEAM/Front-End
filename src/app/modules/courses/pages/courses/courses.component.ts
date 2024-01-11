import { Component, OnInit } from '@angular/core';

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
  onSelect(option: Filter) {
    this.buttonText = option.viewValue;
  }
}
