import { Component, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faCart = faCartPlus;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn
  }
  logOut() {
    this.authService.signOut();
  }
}
