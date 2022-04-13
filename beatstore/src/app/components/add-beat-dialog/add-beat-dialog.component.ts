import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {
  BeatAPIService,
  Beatmp3APIService,
  BeatDTO,
  FullAPIService,
  BeatMP3DTO,
  BeatMP3FullDTO,
  FileRestControllerAPIService,
} from 'src/app/generated';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-beat-dialog',
  templateUrl: './add-beat-dialog.component.html',
  styleUrls: ['./add-beat-dialog.component.scss'],
})
export class AddBeatDialogComponent implements OnInit {
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string;
  color: ThemePalette = 'primary';
  toppingList: string[] = ['Ambient', 'Club', 'Pop', 'Lofi', 'Trap', 'Soul'];
  fg = new FormGroup({
    beatname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    img: new FormControl('', [Validators.required]),
    toppings: new FormControl('', [Validators.required]),
    bpm: new FormControl('', [Validators.required]),
    beatmp3: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private beatService: BeatAPIService,
    private mp3Service: Beatmp3APIService,
    private fullmp3Service: FullAPIService,
    private http: HttpClient,
    private fileService: FileRestControllerAPIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.data.id);
  }

  addBeat() {
    console.log(this.fg.value);
    //let reader= new FileReader();
    let imag: any;
    let mp3: any;
    //let reader1 = new FileReader();

    let imgfileName = this.fg.controls['img'].value.name;
    let mp3fileName = this.fg.controls['beatmp3'].value.name;

    const formData = new FormData();
    formData.append('attachment', this.fg.value.beatmp3);
    console.log(formData);

    this.fileService
      .beatStoreFileUploadPost(formData)
      .toPromise()
      .catch((res) => {
        console.log('XD', res);
      });
    this.fileService
      .beatStoreFileUploadfullPost(formData)
      .toPromise()
      .catch((res) => {
        console.log('XD', res);
    });
 //TODO:
    
    const formData1 = new FormData();
    formData1.append('attachment', this.fg.value.img);
    this.fileService.beatStoreFileUploadImgPost(formData1).toPromise().catch((res) => {
      console.log('XD', res);
      });
    // reader.readAsDataURL(this.fg.value.img)
    //reader.onloadend= () => {
    //imag = reader.result
    let notFullBeat: BeatMP3DTO = {
      path: mp3fileName,
    };
    this.mp3Service
      .createBeat3({ beatMP3DTO: notFullBeat })
      .toPromise()
      .then((res) => {
        console.log('R', res.guid);
        let beat: BeatDTO = {
          name: this.fg.value.beatname,
          price: this.fg.value.price,
          genre: this.fg.value.toppings.toString(),
          producedby: this.data.id,
          BPM: this.fg.value.bpm,
          mp3ID: res.guid,
          imgName: imgfileName,
        };

        let fullmp3beat: BeatMP3FullDTO = {
          beatid: res.guid,
          path: res.path,
        };

        this.fullmp3Service
          .createBeat3fff({ beatMP3FullDTO: fullmp3beat })
          .toPromise()
          .then((res) => {
            this.beatService.createBeat({ beatDTO: beat }).subscribe((res) => {
              console.log('Oby', res);
              this.router.navigate(['/profile']);
            });
          });
        //.then(res=> console.log("fullm3", res));
      });

    //}
  }
}
