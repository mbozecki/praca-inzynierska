import { Options } from '@angular-slider/ngx-slider';
import { Input } from '@angular/compiler/src/core';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  BeatAPIService,
  BeatDTO,
  UserDTO,
  UsersAPIService,
} from 'src/app/generated';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BeatsService } from 'src/app/shared/services/beats.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
})
export class SearchpageComponent implements OnInit, AfterViewInit, OnDestroy {
  public allBeats: BeatDTO[] = [];
  public filteredBeats: BeatDTO[] = [];
  public likedBeatsIDs: string[] = [];
  public beatsInCart: string[] = []
  private sub: Subscription;
  private sub1: Subscription;
  private sub2: Subscription;
  private beatName: string = '';
  private searchTextVal: string = '';
  private filterval: any;
  value: number = 80;
  highValue: number = 220;
  options: Options = {
    floor: 0,
    ceil: 240,
  };

  options1: Options = {
    floor: 0,
    ceil: 300,
  };
  valueDollar: number = 0;
  highValueDollar: number = 300;
  //private allBeatsAPI: Observable<Beat[]>;
  @ViewChild('priceslider') pcslider: MatSlider;
  @ViewChild('search') searchInput: any;
  constructor(
    public beatService: BeatsService,
    private route: ActivatedRoute,
    private beatAPIService: BeatAPIService,
    private usersService: UsersAPIService,
    private authService: AuthService
  ) {}
  fg = new FormGroup({
    genre: new FormControl(''),
    BPM: new FormControl(''),
    maxPrice: new FormControl(''),
    favorites: new FormControl(''),
    sortBy: new FormControl(''),
  });

  genreList: string[] = ['Ambient', 'Club', 'Pop', 'Lofi', 'Trap', 'Soul'];

  sortList: string[] = ['Price ascending', 'Price descending'];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.beatName = params['name'];

      console.log('XD', this.beatName);
    });
    // this.beatService.getAllBeats().subscribe((res) => {
    //   this.allBeats = res;
    //   this.filteredBeats = res;
    // });

    this.beatAPIService
      .getbeatsByCriteria({ page: 0 })
      .toPromise()
      .then((res) => {
        this.allBeats = res.stream as BeatDTO[];
        this.filteredBeats = res.stream as BeatDTO[];
        console.log('r', res);
      });
    this.sub = this.fg.valueChanges.subscribe((data) => {
      console.log(data);
      let notNull: any = {};
      for (let [key, value] of Object.entries(data)) {
        if (!!value) notNull = { ...notNull, [key]: value };
      }

      console.log(notNull);
      this.filterval = notNull;
      this.filterSearch(notNull);
    });

    this.authService.uidObs.subscribe((val) => {
      console.log(val);
      this.usersService
        .getusersByCriteria({ firebaseId: val })
        .subscribe
        ((pageResult) => {
          let currentUser = pageResult.stream![0] as UserDTO;
          // console.log('currentny', currentUser?.likedbeats);
          this.likedBeatsIDs = currentUser?.likedbeats || [];
          this.beatsInCart = currentUser?.beatsincart || []
        });
    });
  }
  ngAfterViewInit(): void {
    this.pcslider.writeValue(300);
    this.pcslider.valueChange.subscribe((val) => {
      console.log(val);
    });
    console.log(this.searchInput);

    this.sub1 = this.searchInput.fg.valueChanges.subscribe((val: any) => {
      console.log('Wal smialo', val.searchText);
      this.searchTextVal = val.searchText;
      this.filterSearch();
    });
    this.searchInput.fg.controls.searchText.patchValue(this.beatName);
    this.fg.controls['maxPrice'].setValue(300);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub1?.unsubscribe();
  }
  formatLabel(value: number) {
    if (value >= 1) {
      return value + '$';
    }
    return value;
  }

  filterSearch(filter?: any) {
    this.filteredBeats = [];
    console.log('thissearcj', this.searchTextVal);
    console.log('BTNMAM', this.beatName);
    if (this.filterval) filter = this.filterval;
    if (!filter)
      filter = {
        BPM: [0, 300],
        maxPrice: [0, 300],
        sortBy: null,
        genre: [],
        favorites: false,
      };
    if (!filter.BPM) filter.BPM = [0, 300];
    if (!filter.maxPrice) filter.maxPrice = [0, 300];
    this.allBeats.forEach((beat: BeatDTO) => {
      if (
        (beat.BPM as number) <= filter?.BPM[1] &&
        (beat.BPM as number) >= filter?.BPM[0] &&
        (beat.price as number) <= filter?.maxPrice[1]
      ) {
        //if (this.beatName != null && beat.name.toLowerCase().includes(this.beatName.toLowerCase())) {
        //  console.log("her", this.beatName)
        if (!this.searchTextVal || !this.searchTextVal) {
          this.filteredBeats.push(beat);
        } else if (
          (beat.name as string)
            .toLowerCase()
            .includes(this.searchTextVal.toLowerCase())
        ) {
          this.filteredBeats.push(beat);
        }
        if (filter.sortBy == 'Price ascending') {
          console.log('ASd');
          this.filteredBeats.sort((a: any, b: any) =>
            a.price > b.price ? 1 : -1
          );
        } else if (filter.sortBy == 'Price descending') {
          this.filteredBeats.sort((a: any, b: any) =>
            a.price < b.price ? 1 : -1
          );
        }
        if (filter.favorites == true) {
          this.filteredBeats = this.filteredBeats.filter((beat) => {
            console.log(this.likedBeatsIDs, beat.guid);
            return this.likedBeatsIDs.includes(beat.guid as string);
          });
        }
        if (filter.genre) {
          filter.genre.forEach((genre: string) => {
            if (!beat.genre?.includes(genre)) {
              this.filteredBeats = this.filteredBeats.filter(item => item !== beat)
            }
          })
        }
      }
    });
    console.log(this.filteredBeats);
  }

  refreshData() {
    this.beatAPIService
      .getbeatsByCriteria({ page: 0 })
      .toPromise()
      .then((res) => {
        this.allBeats = res.stream as BeatDTO[];
        this.filteredBeats = res.stream as BeatDTO[];
        console.log('r', res);
      });

      this.authService.uidObs.subscribe((val) => {
        console.log(val);
        this.usersService
          .getusersByCriteria({ firebaseId: val })
          .subscribe
          ((pageResult) => {
            let currentUser = pageResult.stream![0] as UserDTO;
            // console.log('currentny', currentUser?.likedbeats);
            this.likedBeatsIDs = currentUser?.likedbeats || [];
            this.beatsInCart = currentUser?.beatsincart || []
          });
      });
  }
}
