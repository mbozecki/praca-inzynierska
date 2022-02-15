import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { StreamState } from 'src/app/shared/models/StreamState';
import { AudioService } from 'src/app/shared/services/audio.service';
import { BeatsService } from 'src/app/shared/services/beats.service';

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

  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  constructor(public audioService: AudioService, public beatService: BeatsService) { }

  ngOnInit(): void {
    this.beatService.getFiles().subscribe((files : any) => {
      this.files = files;
    });

    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  play() {
    this.currentFile = this.files[0];
    this.playStream(this.files[0].url);
    this.isPlaying= true;
    //this.audioService.play();
  }
  pause() {
    this.isPlaying =false;
    this.audioService.pause();
  }

  playStream(url : any) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  onSliderChangeEnd(change: any) {
    console.log(change);
    this.audioService.seekTo(change.value);
  }

  onVolumeSliderChange(val:any) {
    this.audioService.setVolume(val.value);
  }

  formatLabel(value: number) {
    return value*100;
  }
}
