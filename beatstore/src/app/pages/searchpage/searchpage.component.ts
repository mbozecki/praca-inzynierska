import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { Beat } from 'src/app/shared/models/Beat';
import { BeatsService } from 'src/app/shared/services/beats.service';


@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit, AfterViewInit {
  public allBeats: Beat[] = [];
  
  //private allBeatsAPI: Observable<Beat[]>;
  @ViewChild('priceslider') pcslider: MatSlider;
  constructor(public beatService: BeatsService) { }
  fg = new FormGroup({
    genre: new FormControl(''),
    favorites: new FormControl(''),
  });
  
  genreList: string[] = ['Lo-fi', 'Electronic', 'Experimental', 'Guitar', 'Piano', 'Pop'];
  ngOnInit(): void {
    
    this.beatService.getAllBeats().subscribe((res) => {
      this.allBeats = res;
    })
    
  }
  ngAfterViewInit(): void {
    this.pcslider.writeValue(120);
    this.pcslider.valueChange.subscribe(val => {
      console.log(val);
    })
  }
  formatLabel(value: number) {
    if (value >= 1) {
      return value + '$';
    }

    return value;
  }
}
