import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { AddBeatDialogComponent } from 'src/app/components/add-beat-dialog/add-beat-dialog.component';
import { Beat } from 'src/app/shared/models/Beat';
import { BeatsService } from 'src/app/shared/services/beats.service';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss'],
})
export class ProfilepageComponent implements OnInit {
  faWrench = faWrench;

  public myBeats: Beat[] = [];
  constructor(
    public beatService: BeatsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.beatService.getAllBeats().subscribe((res) => {
      this.myBeats = res;
    });
  }

  addNewBeat(): void {
    const dialogRef = this.dialog.open(AddBeatDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if(result) this.snackBar.open('Beat successfully created!');
    });
  }
}
