import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserDTO, UsersAPIService } from 'src/app/generated';
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
  public imageURL:SafeUrl
  //private allBeatsAPI: Observable<Beat[]>;
  @ViewChild('priceslider') pcslider: MatSlider;
  constructor(
    public beatService: BeatsService,
    private route: ActivatedRoute,
    private usersService: UsersAPIService,
    private authService: AuthService
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
      this.imageURL = xd
      //TODO czkea na usera
     // this.imageURL=  'data:image/jpeg;base64,' +this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.imgBlob))
      //console.log(this.imageURL)
      //const str2blob = (txt : string) => new Blob([txt]);
       
    })
    this.beatService.getAllBeats().subscribe((res) => {
      this.allBeats = res;
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
