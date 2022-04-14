import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  BeatAPIService,
  BeatDTO,
  Beatmp3APIService,
  FileRestControllerAPIService,
  FullAPIService,
  UserDTO,
  UsersAPIService,
} from 'src/app/generated';
import { Beat } from 'src/app/shared/models/Beat';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddBeatDialogComponent } from '../add-beat-dialog/add-beat-dialog.component';
import { EditBeatDialogComponent } from '../edit-beat-dialog/edit-beat-dialog.component';
import { FixedPlayerComponent } from '../fixed-player/fixed-player.component';
import { MusicBottomBarComponent } from '../music-bottom-bar/music-bottom-bar.component';

@Component({
  selector: 'app-beat-single-downloadable',
  templateUrl: './beat-single-downloadable.component.html',
  styleUrls: ['./beat-single-downloadable.component.scss']
})
export class BeatSingleDownloadableComponent implements OnInit {
  @Input() data: any;
  @Input() editable = false;
  
  beatTypes: string[] = [];
  thumbnail: any;
  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private beatMP3Service: Beatmp3APIService,
    private authService: AuthService,
    private beatAPIService: BeatAPIService,
    private usersService: UsersAPIService,
    private beatFullService: FullAPIService,
    private fileService: FileRestControllerAPIService,
  ) {}

  ngOnInit(): void {
    let imgUrl = 'data:image/jpeg;base64,' + this.data.img;
    //this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    console.log(this.data);
    let imgBlob = this.data.beatimg as string;
    let xd: string = ('data:image/jpeg;base64,' + imgBlob) as any;
    console.log(xd, ' XD');
    this.thumbnail = ('http://localhost:8080/beat-store/file/downloadimg?file=' +
    this.data.imgName) as string;
    this.beatTypes = this.data.genre.split(",");
    //console.log("elo", this.beatTypes)
  }

  onEdit(xdata: any): void {
    const dialogRef = this.dialog.open(EditBeatDialogComponent, {
      height: '600px',
      width: '300px',
      data: {
        beat: xdata,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) this.snackBar.open('Beat successfully edited!');
    });
  }

  play() {
    this.beatMP3Service
      .getBeat3ById({ id: this.data.mp3ID })
      .toPromise()
      .then((res) => {
        //console.log('asd', res.fullbeatmp3);
        /*let file = {
          url: "data:audio/mp3;base64"+ res.fullbeatmp3 as SafeUrl,
          name: this.data.name,
          producedby: this.data.producedby,
          price: this.data.price,
          type: ['Sad', 'Slow', 'Pop']
        }
        */
        let file = {
          //url: new Audio('data:audio/mp3;base64' + res.fullbeatmp3 ),
          name: this.data.name,
          producedby: this.data.producedby,
          price: this.data.price,
          type: ['Sad', 'Slow', 'Pop'],
        };
        //this.player.play(file);
      });

    // console.log(this.data.beatmp3)

    //this.audio.playStream()
  }

  onDownload(data: BeatDTO) {
    console.log(data);
    this.beatMP3Service
      .getBeat3ById({ id: this.data.mp3ID })
      .toPromise()
      .then((res) => {
        window.open('http://localhost:8080/beat-store/file/downloadful?file=' + res.path);
      });
   // data.name
    //this.beatFullService.
   // ("http://localhost:8080/beat-store/file/download?file="+data.paypalmail+".mp3");
    //this.fileService.beatStoreFileDownloadGet({file: "myman.mp3"}).toPromise();

  }

  onHeartAdd(data: BeatDTO) {
    console.log(data);
    this.authService.uidObs.subscribe((val) => {
      console.log(val);
      this.usersService
        .getusersByCriteria({ firebaseId: val })
        .toPromise()
        .then((pageResult) => {
          let currentUser = pageResult.stream![0] as UserDTO;
          console.log("cur", currentUser)
          let newLiked: Array<string> = [];
          if (currentUser.beatsincart) (currentUser.beatsincart as Array<string>).forEach(elem => newLiked.push(elem));
          console.log(newLiked," XADAS")
          newLiked.push(data.guid as string)
          let c_id: string = currentUser.guid as unknown as string;
          let updated: UserDTO = {
            ...currentUser,
            likedbeats: [...new Set(newLiked)]
          }
          if ([...new Set(newLiked)].length != newLiked.length) {
            this.snackBar.open('Beat has already been added to liked!','',
            { 
              duration: 3000
            });
            return;
          }
          console.log("upd", updated)
          this.usersService.updateUser({id: c_id, userDTO: updated}).toPromise()
            .then(res => console.log("colg", res));
            this.snackBar.open('Beat successfully added to liked!','',
            { 
              duration: 3000
            });
        });
    });
  }
}

