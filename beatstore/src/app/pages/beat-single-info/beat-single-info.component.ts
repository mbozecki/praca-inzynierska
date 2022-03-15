import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Beat } from 'src/app/shared/models/Beat';

@Component({
  selector: 'app-beat-single-info',
  templateUrl: './beat-single-info.component.html',
  styleUrls: ['./beat-single-info.component.scss']
})
export class BeatSingleInfoComponent implements OnInit {
  @Input() data: Beat;
  constructor(private sanitizer: DomSanitizer) { }
  beatTypes: any 
  thumbnail: any;
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
