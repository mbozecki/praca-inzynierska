import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; 

  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') as string);
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') as string);
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user as User);
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user as User);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    return this.userData ? true : false
    //const user = JSON.parse(localStorage.getItem('user') as string);
    //return user !== null && user.emailVerified !== false ? true : false;
  }

  GoogleAuth() {
    const provider = new GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then((result: any) => {
      this.router.navigate(['dashboard']);
      this.setUserData(result.user);
    })
    .catch((error: any) => {
      window.alert(error);
    });
  }

 
  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
