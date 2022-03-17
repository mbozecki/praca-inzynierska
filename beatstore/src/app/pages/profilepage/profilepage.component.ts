import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { AddBeatDialogComponent } from 'src/app/components/add-beat-dialog/add-beat-dialog.component';
import { BeatAPIService, BeatDTO, UserDTO, UsersAPIService } from 'src/app/generated';
import { Beat } from 'src/app/shared/models/Beat';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BeatsService } from 'src/app/shared/services/beats.service';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss'],
})
export class ProfilepageComponent implements OnInit, OnDestroy {
  faWrench = faWrench;
  public bio = ""
  public username = ""
  public myBeats: Beat[] = [];
  public boughtLicenses: Beat[] = []
  public imgBlob : Blob = new Blob();
  public imageURL:SafeUrl
  constructor(
    public beatService: BeatsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private beatAPIService : BeatAPIService,
    private usersService: UsersAPIService,
    private sanitizer : DomSanitizer
  ) {}

  ngOnInit(): void {

    this.authService.uidObs.subscribe((val) => {
      console.log(val);
      this.usersService.getusersByCriteria({firebaseId: val}).toPromise().then(pageResult => {

        let currentUser = pageResult.stream![0] as UserDTO
        console.log(currentUser);
        this.bio = currentUser.bio as string;
        this.username = currentUser.name as string
        this.boughtLicenses = currentUser.boughtbeats as Beat[];
        console.log(currentUser.profilepicture)
        this.imgBlob = currentUser.profilepicture as Blob
        let xd :string = 'data:image/jpeg;base64,' + currentUser.profilepicture as any 
        this.imageURL = xd
       // this.imageURL=  'data:image/jpeg;base64,' +this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.imgBlob))
        //console.log(this.imageURL)
        //const str2blob = (txt : string) => new Blob([txt]);
         this.beatAPIService.getbeatsByCriteria({producedby: this.username }).subscribe(res => {
           console.log(res);
           let allbits: Beat[] = res.stream as Beat[];
           let filteredB: Beat[] = allbits.filter((bit: Beat) => {
             console.log(bit, this.username)
              return bit.producedby == this.username ? bit : ''
          })
          console.log(filteredB, "XD");
          this.myBeats = filteredB;
         })
      })
    })
    console.log("elo", this.authService.uid, this.authService.userData, this.authService.isLoggedIn)
  }

  addNewBeat(): void {
    const dialogRef = this.dialog.open(AddBeatDialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        id : this.username
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if(result) this.snackBar.open('Beat successfully created!');
    });
  }

  ngOnDestroy(): void {
      
  }
}
