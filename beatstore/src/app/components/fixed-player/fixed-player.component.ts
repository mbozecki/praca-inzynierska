import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
@Injectable({ providedIn: 'root' })
export class FixedPlayerComponent implements OnInit, OnDestroy {
  faPlay=faPlay;
  faPause=faPause;
  faHeart= faHeart;
  faCart = faCartPlus;
  faVolume = faVolumeUp

  isVisible: boolean = true;
  isPlaying: boolean= false;

  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  constructor(public audioService: AudioService, public beatService: BeatsService, private router: Router) { }

  ngOnInit(): void {
    this.beatService.getFiles().subscribe((files : any) => {
      this.files = files;
    });

    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  play(file?: any) {
   
    if (file) {
      this.currentFile = file;
      console.log("crn", this.currentFile)
      this.playStream(file.url)
    } else {
      this.currentFile = this.files[0];
      this.playStream(this.files[0].url);

    }
    this.isPlaying= true;
    this.audioService.play();
  }
  pause() {
    this.isPlaying =false;
    this.audioService.pause();
  }

  playStream(url : any) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
      console.log("xd",events);
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

  enableVisibility() {
    this.isVisible = true;
  }
  disableVisibility() {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
      this.audioService.stop();
  }
}
