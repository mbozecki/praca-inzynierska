import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BeatAPIService, UserDTO, UsersAPIService } from 'src/app/generated';
import { Beat } from 'src/app/shared/models/Beat';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BeatsService } from 'src/app/shared/services/beats.service';

@Component({
  selector: 'app-public-profile-page',
  templateUrl: './public-profile-page.component.html',
  styleUrls: ['./public-profile-page.component.scss'],
})
export class PublicProfilePageComponent implements OnInit, AfterViewInit {
  public allBeats: Beat[] = [];
  public bio = ""
  public username = ""
  public myBeats: Beat[] = [];
  public boughtLicenses: Beat[] = []
  public imgBlob : Blob = new Blob();
  public imageURL: string;
  //private allBeatsAPI: Observable<Beat[]>;
  @ViewChild('priceslider') pcslider: MatSlider;
  constructor(
    public beatService: BeatsService,
    private route: ActivatedRoute,
    private usersService: UsersAPIService,
    private authService: AuthService,
    private beatAPIservice: BeatAPIService
  ) {}
  fg = new FormGroup({
    genre: new FormControl(''),
    favorites: new FormControl(''),
  });

  genreList: string[] = ['Ambient', 'Club', 'Pop', 'Lofi', 'Trap', 'Soul'];
  ngOnInit(): void {
    console.log(this.authService.uid, this.authService.userData, this.authService.isLoggedIn)
    this.route.params.subscribe((params) => {
      this.username = params['userid'];
    });
    console.log(this.username)
    this.usersService.getusersByCriteria({name: this.username}).toPromise().then(pageResult => {

      let currentUser = pageResult.stream![0] as UserDTO
      console.log(currentUser);
      this.bio = currentUser.bio as string;
      this.username = currentUser.name as string
      console.log(currentUser.profilepicture)
      this.imgBlob = currentUser.profilepicture as Blob
      let xd :string = 'data:image/jpeg;base64,' + currentUser.profilepicture as any 
      this.imageURL = currentUser.paypalmail || ""
      //TODO czkea na usera
     // this.imageURL=  'data:image/jpeg;base64,' +this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.imgBlob))
      //console.log(this.imageURL)
      //const str2blob = (txt : string) => new Blob([txt]);
       
    });
    this.beatAPIservice.getbeatsByCriteria({producedby: this.username }).subscribe(res => {
      console.log(res);
      let allbits: Beat[] = res.stream as Beat[];
      let filteredB: Beat[] = allbits.filter((bit: Beat) => {
        console.log(bit, this.username)
         return bit.producedby == this.username ? bit : ''
     })
     console.log(filteredB, "XD");
     this.myBeats = filteredB;
     console.log(this.myBeats, "XD")
  });

    
  }
  ngAfterViewInit(): void {
    this.pcslider.writeValue(120);
    this.pcslider.valueChange.subscribe((val) => {
      console.log(val);
    });
  }
  formatLabel(value: number) {
    if (value >= 1) {
      return value + '$';
    }

    return value;
  }
}
