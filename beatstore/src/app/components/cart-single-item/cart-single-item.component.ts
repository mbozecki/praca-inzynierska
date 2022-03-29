import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Beat } from 'src/app/shared/models/Beat';

@Component({
  selector: 'app-cart-single-item',
  templateUrl: './cart-single-item.component.html',
  styleUrls: ['./cart-single-item.component.scss']
})
export class CartSingleItemComponent implements OnInit {
  @Input() data: any;
  beatTypes: any 
  thumbnail: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    let imgBlob = this.data.beatimg as string;

    let xd: string = ('data:image/jpeg;base64,' + imgBlob) as any;
    console.log(xd, ' XD');
    this.thumbnail = xd;
  }

}
