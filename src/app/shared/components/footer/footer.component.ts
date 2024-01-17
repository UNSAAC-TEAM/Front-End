import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isVisible: boolean = false;

  toggleVisibility(event: Event): void {
    event.preventDefault();
    this.isVisible = !this.isVisible;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
