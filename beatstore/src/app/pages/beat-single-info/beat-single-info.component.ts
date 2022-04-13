import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BeatAPIService, Beatmp3APIService } from 'src/app/generated';
import { Beat } from 'src/app/shared/models/Beat';
import { AudioService } from 'src/app/shared/services/audio.service';

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
    private beatMP3Service: Beatmp3APIService ) { }
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

  }

  heart() {

  }

}
