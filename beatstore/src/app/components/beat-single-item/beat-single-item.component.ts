import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Beat } from 'src/app/shared/models/Beat';

@Component({
  selector: 'app-beat-single-item',
  templateUrl: './beat-single-item.component.html',
  styleUrls: ['./beat-single-item.component.scss']
})
export class BeatSingleItemComponent implements OnInit {
  @Input() data: Beat;
  beatTypes: any 
  thumbnail: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let imgUrl = 'data:image/jpeg;base64,' + this.data.img;
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    this.beatTypes = [
      {name: this.data?.type[0] , color: 'primary'},
      {name: this.data?.type[1], color: 'accent'},
      {name: this.data?.type[2], color: 'warn'},
    ];
  }

}
