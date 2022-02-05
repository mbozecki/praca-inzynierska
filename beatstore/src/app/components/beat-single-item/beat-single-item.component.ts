import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beat-single-item',
  templateUrl: './beat-single-item.component.html',
  styleUrls: ['./beat-single-item.component.scss']
})
export class BeatSingleItemComponent implements OnInit {
  availableColors: any = [
    {name: 'Lo-fi', color: 'primary'},
    {name: 'Guitar', color: 'accent'},
    {name: 'Chill', color: 'warn'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
