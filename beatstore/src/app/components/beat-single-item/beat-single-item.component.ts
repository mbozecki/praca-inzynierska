import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Beat } from 'src/app/shared/models/Beat';
import { AudioService } from 'src/app/shared/services/audio.service';
import { AddBeatDialogComponent } from '../add-beat-dialog/add-beat-dialog.component';
import { EditBeatDialogComponent } from '../edit-beat-dialog/edit-beat-dialog.component';
import { FixedPlayerComponent } from '../fixed-player/fixed-player.component';
import { MusicBottomBarComponent } from '../music-bottom-bar/music-bottom-bar.component';

@Component({
  selector: 'app-beat-single-item',
  templateUrl: './beat-single-item.component.html',
  styleUrls: ['./beat-single-item.component.scss']
})
export class BeatSingleItemComponent implements OnInit {
  @Input() data: any;
  @Input() editable = false;
  beatTypes: any 
  thumbnail: SafeUrl
  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog,
    private snackBar: MatSnackBar, private audio: AudioService,
    private player: FixedPlayerComponent) { }

  ngOnInit(): void {
    let imgUrl = 'data:image/jpeg;base64,' + this.data.img;
    //this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    console.log(this.data)
    let imgBlob = this.data.beatimg as string;
    
    let xd :string = 'data:image/jpeg;base64,' + imgBlob as any
    console.log(xd," XD");
    this.thumbnail = xd
    this.beatTypes = [
      {name: 'Type1', color: 'primary'},
      {name: 'Type2', color: 'accent'},
      {name: 'Type3', color: 'warn'},
    ];
  }

  onEdit(xdata: any) : void {
    const dialogRef = this.dialog.open(EditBeatDialogComponent, {
      height: '600px',
      width: '300px',
      data: {
        beat: xdata
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if(result) this.snackBar.open('Beat successfully edited!');
    });

  }

  play() {
    let file = {
      url: "data:audio/mp3;base64"+this.data.beatmp3 as SafeUrl,
      name: this.data.name,
      producedby: this.data.producedby,
      price: this.data.price,
      type: ['Sad', 'Slow', 'Pop']
    }
   // console.log(this.data.beatmp3)
    this.player.play(file)
    //this.audio.playStream()
  }
}
