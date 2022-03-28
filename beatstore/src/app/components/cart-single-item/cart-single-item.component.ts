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
    let imgUrl = 'data:image/jpeg;base64,' + this.data.img;
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
  }

}
