import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  BeatAPIService,
  BeatDTO,
  Beatmp3APIService,
  FileRestControllerAPIService,
  UserDTO,
  UsersAPIService,
} from 'src/app/generated';
import { Beat } from 'src/app/shared/models/Beat';
import { AudioService } from 'src/app/shared/services/audio.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddBeatDialogComponent } from '../add-beat-dialog/add-beat-dialog.component';
import { EditBeatDialogComponent } from '../edit-beat-dialog/edit-beat-dialog.component';
import { FixedPlayerComponent } from '../fixed-player/fixed-player.component';
@Component({
  selector: 'app-beat-single-item',
  templateUrl: './beat-single-item.component.html',
  styleUrls: ['./beat-single-item.component.scss'],
})
export class BeatSingleItemComponent implements OnInit {
  @Input() data: any;
  @Input() editable = false;
  @Input() inCart = false;
  @Input() isLiked = false;
  @Output() refresh = new EventEmitter<string>();
  beatTypes: string[] = [];
  thumbnail: SafeUrl;
  public imageURL: string = '';
  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private beatMP3Service: Beatmp3APIService,
    private authService: AuthService,
    private beatAPIService: BeatAPIService,
    private usersService: UsersAPIService,
    private fileService: FileRestControllerAPIService,
    private audio: AudioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let imgUrl = 'data:image/jpeg;base64,' + this.data.img;
    //this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    console.log(this.data);
    let imgBlob = this.data.beatimg as string;
    this.imageURL = ('http://localhost:8080/beat-store/file/downloadimg?file=' +
      this.data.imgName) as string;
    let xd: string = ('data:image/jpeg;base64,' + imgBlob) as any;
    console.log(xd, ' XD');
    this.thumbnail = xd;
    this.beatTypes = this.data.genre.split(',');

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
      if (result)
        this.snackBar.open('Beat successfully edited!', '', {
          duration: 3000,
        });
    });
  }

  play() {
    this.beatMP3Service
      .getBeat3ById({ id: this.data.mp3ID })
      .toPromise()
      .then((res) => {
        console.log(res);
        let file = {
          url: 'http://localhost:8080/beat-store/file/download?file=' + res.path,
          name: this.data.name,
          producedby: this.data.producedby,
          price: this.data.price,
          type: this.data.genre.toString(),
          liked: this.isLiked,
          cart: this.inCart,
          imgName: this.data.imgName
        };

        this.audio.getFile().subscribe((e) => console.log('file', e));
        this.audio.setFile(file);
        this.audio
          .playStream(
            'http://localhost:8080/beat-store/file/download?file=' + res.path
          )
          .subscribe();
      });

  }

  onCartAdd(data: BeatDTO) {
    console.log(data);
    this.authService.uidObs.subscribe((val) => {
      console.log(val);
      this.usersService
        .getusersByCriteria({ firebaseId: val })
        .toPromise()
        .then((pageResult) => {
          let currentUser = pageResult.stream![0] as UserDTO;
          console.log('cur', currentUser);
          let newLiked: Array<string> = [];
          if (currentUser.beatsincart)
            (currentUser.beatsincart as Array<string>).forEach((elem) =>
              newLiked.push(elem)
            );
          console.log(newLiked, ' XADAS');
          newLiked.push(data.guid as string);

          if ([...new Set(newLiked)].length != newLiked.length) {
            this.snackBar.open('Beat has already been added to cart!', '', {
              duration: 3000,
            });
            return;
          }
          let c_id: string = currentUser.guid as unknown as string;
          let updated: UserDTO = {
            ...currentUser,
            beatsincart: [...new Set(newLiked)],
          };
          console.log('upd', updated);
          this.usersService
            .updateUser({ id: c_id, userDTO: updated })
            .toPromise()
            .then((res) => console.log('colg', res));
          this.snackBar.open('Beat successfully added to cart!', '', {
            duration: 3000,
          });
          this.inCart = true;
          this.refresh.emit('true');
        });
    });
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
          console.log('cur', currentUser);
          let newLiked: Array<string> = [];
          if (currentUser.likedbeats)
            (currentUser.likedbeats as Array<string>).forEach((elem) =>
              newLiked.push(elem)
            );
          console.log(newLiked, ' XADAS');
          newLiked.push(data.guid as string);
          let c_id: string = currentUser.guid as unknown as string;
          let updated: UserDTO = {
            ...currentUser,
            likedbeats: [...new Set(newLiked)],
          };
          if ([...new Set(newLiked)].length != newLiked.length) {
            this.snackBar.open('Beat has already been added to liked!', '', {
              duration: 3000,
            });
            return;
          }
          console.log('upd', updated);
          this.isLiked = true;
          this.usersService
            .updateUser({ id: c_id, userDTO: updated })
            .toPromise()
            .then((res) => console.log('colg', res));
          this.snackBar.open('Beat successfully added to liked!', '', {
            duration: 3000,
          });

          this.refresh.emit('true');
          this.isLiked = true;
        });
    });
  }

  openPage() {
    console.log("elo", this.data)
    this.router.navigate(['beat',this.data.guid])
  }
}
