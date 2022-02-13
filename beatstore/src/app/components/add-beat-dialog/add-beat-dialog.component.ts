import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-add-beat-dialog',
  templateUrl: './add-beat-dialog.component.html',
  styleUrls: ['./add-beat-dialog.component.scss']
})
export class AddBeatDialogComponent implements OnInit {
  toppings = new FormControl();
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string;
  color: ThemePalette = 'primary';
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor() { }

  ngOnInit(): void {
  }
  
}
