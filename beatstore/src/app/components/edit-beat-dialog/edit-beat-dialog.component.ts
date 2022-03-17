import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Beat, BeatAPIService, BeatDTO, UpdateBeatRequestParams } from 'src/app/generated';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-edit-beat-dialog',
  templateUrl: './edit-beat-dialog.component.html',
  styleUrls: ['./edit-beat-dialog.component.scss']
})
export class EditBeatDialogComponent implements OnInit {

  disabled: boolean = false;
  multiple: boolean = false;
  accept: string;
  public beatname ="";
  public types = ""
  public bpm = ""
  public price = 20;
  color: ThemePalette = 'primary';
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  fg = new FormGroup({
    beatname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    img: new FormControl('', [Validators.required]),
    toppings: new FormControl('', [Validators.required]),
    bpm: new FormControl('', [Validators.required]),
    beatmp3: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: Beat,private beatService: BeatAPIService) { }

  ngOnInit(): void {
    console.log(this.data)
    this.beatname = this.data.name as string;
    this.bpm = "132"
    this.price = this.data.price as number
    //this.types = this.data.genre;
  }
  
  saveBeat() {
    console.log(this.fg.value)
    let reader= new FileReader();
    let imag: any;
    reader.readAsDataURL(this.fg.value.img)
    reader.onloadend= () => {
      imag = reader.result
      let beat: BeatDTO = { 
        name: this.fg.value.beatname,
        beatimg: imag as Blob,
        price: this.fg.value.price,
        genre: this.fg.value.toppings,
        
        producedby: this.data.producedby
    }
    let bUP: UpdateBeatRequestParams =  {
      id: this.data.guid as string,
      beatDTO: beat
   }
      this.beatService.updateBeat(bUP)
    }
    
  }
}