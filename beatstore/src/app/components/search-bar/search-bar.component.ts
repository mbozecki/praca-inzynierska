import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  faSearch= faSearch;
  @Input() hint =""
  @Input() actionHint = ""
  fg : any;
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.initInput()
  }

  initInput() {
    this.fg = new FormGroup({
      searchText: new FormControl()
  });
  }
  navigateToExplore() {
    console.log(this.fg.value.searchText)
    this.router.navigate(['/search/'+this.fg.value.searchText])
  }
}
