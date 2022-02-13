import { Component, OnInit } from '@angular/core';
import { Beat } from 'src/app/shared/models/Beat';
import { BeatsService } from 'src/app/shared/services/beats.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  public cartBeats: Beat[] = [];
  constructor(public beatService: BeatsService) { }

  ngOnInit(): void {
    this.beatService.getAllBeats().subscribe((res) => {
      this.cartBeats = res.slice(0,2);
    })
  }
}
