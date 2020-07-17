import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import {User} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User = null;
  qResolve = null;
  qAuth = new Promise<boolean>(resolve => this.qResolve = resolve);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.qResolve(true);
      } else {
        this.qResolve(false);
      }
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }
}
