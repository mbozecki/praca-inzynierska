import { Component, OnInit } from '@angular/core';
import { BeatAPIService, GetBeatByIdRequestParams } from 'src/app/generated';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
