import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fixed-player',
  templateUrl: './fixed-player.component.html',
  styleUrls: ['./fixed-player.component.scss']
})
export class FixedPlayerComponent implements OnInit {
  faPlay=faPlay;
  faPause=faPause;
  faHeart= faHeart;
  faCart = faCartPlus;
  faVolume = faVolumeUp

  isPlaying: boolean= false;
  constructor() { }

  ngOnInit(): void {
  }

  play() {
    this.isPlaying= true;
  }
  pause() {
    this.isPlaying =false;
  }
}
