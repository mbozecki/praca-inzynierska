import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { BeatAPIService, BeatDTO } from 'src/app/generated';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-add-beat-dialog',
  templateUrl: './add-beat-dialog.component.html',
  styleUrls: ['./add-beat-dialog.component.scss']
})
export class AddBeatDialogComponent implements OnInit {
  
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string;
  color: ThemePalette = 'primary';
  toppingList: string[] = ['Ambient', 'Club', 'Pop', 'Lofi', 'Trap', 'Soul'];
  fg = new FormGroup({
    beatname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    img: new FormControl('', [Validators.required]),
    toppings: new FormControl('', [Validators.required]),
    bpm: new FormControl('', [Validators.required]),
    beatmp3: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private beatService: BeatAPIService) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }
  
  addBeat() {
    console.log(this.fg.value)
    let reader= new FileReader();
    let imag: any;
let mp3: any;
    let reader1 = new FileReader();
    reader.readAsDataURL(this.fg.value.img)
    reader.onloadend= () => {
      imag = reader.result
      //reader.result
      let arr : string[] = imag.split(",");

      reader1.readAsDataURL(this.fg.value.beatmp3)
      reader1.onloadend= () => {
        mp3 = reader1.result
        let slicedmp3 : string[] = mp3.split(",")
        let newbie: string = slicedmp3[1].substring(0, 2000000) + slicedmp3[1].slice(slicedmp3[1].length - 60000);
        //TODO zrob bpmy
        console.log(slicedmp3[1] as unknown as Blob)
        console.log(newbie);
        let beat: BeatDTO = { 
          name: this.fg.value.beatname,
          beatimg: arr[1] as unknown as Blob,
          price: this.fg.value.price,
          genre: this.fg.value.toppings.toString(),
          producedby: this.data.id,
          beatmp3: slicedmp3[1] as unknown as Blob,
        }
       // this.beatService.createBeat({beatDTO: beat}).subscribe(res=>console.log(res));
      }
    }
    
  }
}
