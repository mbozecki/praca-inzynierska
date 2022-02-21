import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';
import { Observable, Subscription } from 'rxjs';
import { Beat } from 'src/app/shared/models/Beat';
import { BeatsService } from 'src/app/shared/services/beats.service';


@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit, AfterViewInit, OnDestroy {
  public allBeats: Beat[] = [];
  public filteredBeats: Beat[] = [];
  private sub: Subscription
  //private allBeatsAPI: Observable<Beat[]>;
  @ViewChild('priceslider') pcslider: MatSlider;
  constructor(public beatService: BeatsService) { }
  fg = new FormGroup({
    genre: new FormControl(''),
    BPM: new FormControl(''),
    maxPrice: new FormControl(''),
    favorites: new FormControl(''),
  });
  
  genreList: string[] = ['Lo-fi', 'Electronic', 'Experimental', 'Guitar', 'Piano', 'Pop'];
  ngOnInit(): void {

    this.beatService.getAllBeats().subscribe((res) => {
      this.allBeats = res;
      this.filteredBeats =res;
    })
    this.sub= this.fg.valueChanges
    .subscribe((data) => {
      console.log(data)
      this.filterSearch(data);
    })
    
  }
  ngAfterViewInit(): void {
    this.pcslider.writeValue(120);
    this.pcslider.valueChange.subscribe(val => {
      console.log(val);
    })
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  formatLabel(value: number) {
    if (value >= 1) {
      return value + '$';
    }
    return value;
  }

  filterSearch(filter: any) {
    this.filteredBeats = [];
    this.allBeats.forEach((beat : Beat) => {
      if (beat.BPM as number <= filter.BPM) {
            this.filteredBeats.push(beat);
          }
    });
    console.log(this.filteredBeats);
  }
}
