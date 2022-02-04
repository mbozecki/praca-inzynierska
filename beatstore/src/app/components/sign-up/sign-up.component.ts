import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({
    nickname: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password1: new FormControl("", [Validators.required, Validators.minLength(5)]),
    password2: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    //this.initFormGroup();
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      alert("Niepoprawne wartosci pol! Sprobuj ponownie")
    } else {
      this.authService.signUp(this.registerForm.value.email, this.registerForm.value.password);
      //, this.registerForm.value.name, this.registerForm.value.surname
    }
  }

}