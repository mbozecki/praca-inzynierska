import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {

  constructor() { }
  fg = new FormGroup({
    genre: new FormControl(''),
    favorites: new FormControl(''),
  });
  
  genreList: string[] = ['Lo-fi', 'Electronic', 'Experimental', 'Guitar', 'Piano', 'Pop'];
  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return value + '$';
    }

    return value;
  }
}
