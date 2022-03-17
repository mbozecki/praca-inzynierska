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
    this.beatapiservice.getBeatById({id: "3d4ad78d-db82-416a-8205-d087a49d1ca9"}).subscribe(res => console.log(res));
  }

}
