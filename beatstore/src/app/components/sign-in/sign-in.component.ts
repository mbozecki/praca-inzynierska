import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO, UsersAPIService } from 'src/app/generated';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({
    nickname: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    bio: new FormControl("", [Validators.required, Validators.minLength(5)]),
    
  });

  constructor(public authService: AuthService, private userService: UsersAPIService, private router: Router) { }

  ngOnInit(): void {
    //this.initFormGroup();
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      alert("Niepoprawne wartosci pol! Sprobuj ponownie")
    } else {
      this.authService.signIn(this.registerForm.value.email, this.registerForm.value.password).then((result:any) => {
        this.userService
          .getusersByCriteria({firebaseId: result.user.uid})
          .toPromise().then((pageResult:any) => {
            let currentUser = pageResult.stream[0] as UserDTO
            this.authService.uid= currentUser.guid
            setTimeout(() => {
              this.router.navigate(['/'])
          }, 1500);
            
          })
        //localStorage.setItem('user', JSON.stringify(this.userData));
        
        
      }).catch((error) => {
        window.alert(error.message)
      })
      //, this.registerForm.value.name, this.registerForm.value.surname
    }
  }

}
