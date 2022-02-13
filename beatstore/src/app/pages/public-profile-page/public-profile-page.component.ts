import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';
import { Beat } from 'src/app/shared/models/Beat';
import { BeatsService } from 'src/app/shared/services/beats.service';

@Component({
  selector: 'app-public-profile-page',
  templateUrl: './public-profile-page.component.html',
  styleUrls: ['./public-profile-page.component.scss']
})
export class PublicProfilePageComponent implements OnInit, AfterViewInit {
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
