import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BeatAPIService, Beatmp3APIService, UserDTO, UsersAPIService } from 'src/app/generated';
import { Beat } from 'src/app/shared/models/Beat';
import { AudioService } from 'src/app/shared/services/audio.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-beat-single-info',
  templateUrl: './beat-single-info.component.html',
  styleUrls: ['./beat-single-info.component.scss']
})
export class BeatSingleInfoComponent implements OnInit {
  public data: any;
  private bID: any;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private beatAPIService : BeatAPIService,
    private audio: AudioService,
    private beatMP3Service: Beatmp3APIService,
    private authService: AuthService,
    private usersService: UsersAPIService,
    private snackBar: MatSnackBar ) { }
  beatTypes: any 
  thumbnail: any;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bID = params['beatid']
      this.beatAPIService.getBeatById({id: this.bID}).toPromise()
         .then(beat => this.data = beat);

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
        //liked: this.isLiked,
        //cart: this.inCart,
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

  cart() {
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
          newLiked.push(this.data.guid as string);

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
        });
    });
  }

  heart() {
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
          newLiked.push(this.data.guid as string);
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
          //this.isLiked = true;
          this.usersService
            .updateUser({ id: c_id, userDTO: updated })
            .toPromise()
            .then((res) => console.log('colg', res));
          this.snackBar.open('Beat successfully added to liked!', '', {
            duration: 3000,
          });
        });
    });
  }

}
