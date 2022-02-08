import { Component, OnInit } from '@angular/core';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { Beat } from 'src/app/shared/models/Beat';
import { BeatsService } from 'src/app/shared/services/beats.service';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss']
})
export class ProfilepageComponent implements OnInit {
  faWrench = faWrench;
  public myBeats: Beat[] = [];
  constructor(public beatService: BeatsService) { }
  
  ngOnInit(): void {
    this.beatService.getAllBeats().subscribe((res) => {
      this.myBeats = res;
    })
  }

}
