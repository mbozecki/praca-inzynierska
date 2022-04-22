import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {
  BeatAPIService,
  BeatDTO,
  UpdateBeatRequestParams,
} from 'src/app/generated';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-beat-dialog',
  templateUrl: './edit-beat-dialog.component.html',
  styleUrls: ['./edit-beat-dialog.component.scss'],
})
export class EditBeatDialogComponent implements OnInit {
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string;
  public beatname = '';
  public types = '';
  public bpm = '';
  public pricex = 20;
  color: ThemePalette = 'primary';
  genreList: string[] = ['Ambient', 'Club', 'Pop', 'Lofi', 'Trap', 'Soul'];
  fg = new FormGroup({
    beatname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    img: new FormControl('', [Validators.required]),
    toppings: new FormControl('', [Validators.required]),
    bpm: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private beatService: BeatAPIService,
    private ref: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data.beat);
    this.beatname = this.data.beat.name as string;
    this.bpm = this.data.beat.BPM;
    this.pricex = this.data.beat.price as number;
    // this.genreList = this.data.beat.genre.split(',')

    this.fg.controls['toppings'].setValue(this.data.beat.genre.split(','));
    this.fg.controls['bpm'].setValue(this.data.beat.BPM);
    this.fg.controls['beatname'].setValue(this.data.beat.name);
    this.fg.controls['price'].setValue(this.data.beat.price);
    console.log(this.fg, this.data.beat.price);
    //this.types = this.data.genre;

  }

  saveBeat() {
    console.log(this.fg.value);
    /*
    let reader= new FileReader();
    let imag: any;
    reader.readAsDataURL(this.fg.value.img)
    reader.onloadend= () => {
      imag = reader.result
      
    }
    */


    let beat: BeatDTO = {
      ...(this.data.beat as BeatDTO),
      name: this.fg.value.beatname,
      price: this.fg.value.price,
      genre: this.fg.value.toppings.toString(),
      BPM: +this.fg.value.bpm,
    };
    let bUP: UpdateBeatRequestParams = {
      id: this.data.beat.guid as string,
      beatDTO: beat,
    };
    console.log()
    this.beatService
      .updateBeat(bUP)
      .toPromise()
      .then((res) => {
        console.log(res);
        this.ref.closeAll();
      });
  }
  
  
}


