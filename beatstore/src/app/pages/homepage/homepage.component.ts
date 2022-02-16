import { Component, OnInit } from '@angular/core';
import { BeatAPIService, GetBeatByIdRequestParams } from 'src/app/generated';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private beatapiservice: BeatAPIService) { }

  ngOnInit(): void {
    this.beatapiservice.getBeatById({id: "123e4567-e89b-12d3-a456-556642440000"}).subscribe(res => console.log(res));
  }

}
