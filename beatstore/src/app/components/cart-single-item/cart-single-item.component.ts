import { Component, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BeatAPIService, UserDTO, UsersAPIService } from 'src/app/generated';
import { Beat } from 'src/app/shared/models/Beat';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-cart-single-item',
  templateUrl: './cart-single-item.component.html',
  styleUrls: ['./cart-single-item.component.scss']
})
export class CartSingleItemComponent implements OnInit {
  @Input() data: any;
  @Input() currentUser: any;
  @Output() deleteEvent = new EventEmitter<string>()
  beatTypes: any 
  thumbnail: any;
  constructor(private sanitizer: DomSanitizer, private userService: UsersAPIService, private beatservice: BeatAPIService) { }

  ngOnInit(): void {

    this.thumbnail = ('http://localhost:8080/beat-store/file/downloadimg?file=' +
      this.data.imgName) as string;
  }

  deleteFromCart(): void {
    console.log(this.data);
    console.log(this.currentUser);
    let oldBeats: string[] = this.currentUser.beatsincart;
    let newBeats: string[] = oldBeats.filter((item) => {
      return item !== this.data.guid
     })
    let newUsrDTO: UserDTO = {
      ...this.currentUser,
      beatsincart: newBeats,
    }
    this.userService.updateUser({id: this.currentUser.guid, userDTO: newUsrDTO })
      .toPromise()
      .then(res => {
        console.log(res)
        this.deleteEvent.emit("true");
      });
  }
}
