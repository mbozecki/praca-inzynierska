import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Beat } from 'src/app/shared/models/Beat';
import { AddBeatDialogComponent } from '../add-beat-dialog/add-beat-dialog.component';
import { EditBeatDialogComponent } from '../edit-beat-dialog/edit-beat-dialog.component';

@Component({
  selector: 'app-beat-single-item',
  templateUrl: './beat-single-item.component.html',
  styleUrls: ['./beat-single-item.component.scss']
})
export class BeatSingleItemComponent implements OnInit {
  @Input() data: Beat;
  @Input() editable = false;
  beatTypes: any 
  thumbnail: any;
  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let imgUrl = 'data:image/jpeg;base64,' + this.data.img;
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    this.beatTypes = [
      {name: this.data?.type[0] , color: 'primary'},
      {name: this.data?.type[1], color: 'accent'},
      {name: this.data?.type[2], color: 'warn'},
    ];
  }

  onEdit() : void {
    const dialogRef = this.dialog.open(EditBeatDialogComponent, {
      height: '600px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if(result) this.snackBar.open('Beat successfully edited!');
    });

  }
}
