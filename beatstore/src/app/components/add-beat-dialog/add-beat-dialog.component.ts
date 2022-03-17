import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { BeatAPIService, BeatDTO } from 'src/app/generated';

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
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  fg = new FormGroup({
    beatname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    img: new FormControl('', [Validators.required]),
    toppings: new FormControl('', [Validators.required]),
    bpm: new FormControl('', [Validators.required]),
    beatmp3: new FormControl('', [Validators.required]),
  })
  constructor(private beatService: BeatAPIService) { }

  ngOnInit(): void {
    console.log(this.fg.value.beatname)
  }
  
  addBeat() {
    console.log(this.fg.value)
    let reader= new FileReader();
    let imag: any;
    reader.readAsDataURL(this.fg.value.img)
    reader.onloadend= () => {
      imag = reader.result
      //reader.result
      let arr : string[] = imag.split(",");
      console.log("ARR")
      let beat: BeatDTO = { 
        guid: "423e4567-e89b-12d3-a456-556642440000",
        name: this.fg.value.beatname,
        beatimg: arr[1] as unknown as Blob,
        price: 23.12,
        genre: this.fg.value.toppings[0],
        
        producedby: "smialek"
    }
      this.beatService.createBeat({beatDTO: beat}).subscribe(res=>console.log(res));
    }
    
  }
}
