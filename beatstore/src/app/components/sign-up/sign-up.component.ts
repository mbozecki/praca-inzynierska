import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CreateUserRequestParams,
  UserDTO,
  UsersAPIService,
} from 'src/app/generated';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public registerForm: any
  private byteImg: any;
  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UsersAPIService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }
  initFormGroup() {
    this.registerForm = new FormGroup({
      nickname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      bio: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(400),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      img: new FormControl('', Validators.required),
    });
  }
  submitForm(): void {
    if (this.registerForm.invalid) {
      alert('Niepoprawne wartosci pol! Sprobuj ponownie');
    } else {
      this.authService
        .signUp(
          this.registerForm.value.email,
          this.registerForm.value.password2
        )
        .then(() => {
            console.log("myuser", this.authService.uid);
            let reader= new FileReader();
            let imag: any;
            reader.readAsDataURL(this.registerForm.value.img)
            reader.onloadend= () => {
              imag = reader.result
      //reader.result
      console.log("imag", imag)
              let arr : string[] = imag.split(",");
              console.log("arr", arr)
            //profilepicture: this.byteImg
              let newUser: UserDTO = {
                name: this.registerForm.value.nickname,
                bio: this.registerForm.value.bio,
                email: this.registerForm.value.email,
                firebase_id: this.authService.uid,
                //profilepicture: arr[1] as unknown as Blob,
              };
              console.log("newUser", newUser)
              this.userService
                .createUser({userDTO: newUser})
                .toPromise()
                .then(() => this.router.navigate(['/']));
            }
        });
      //, this.registerForm.value.name, this.registerForm.value.surname
    }
  }
  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.byteImg = reader.result
    };
}
}
