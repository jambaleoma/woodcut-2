import { async } from '@angular/core/testing';
import { User } from './../model/user.model';


import { Platform, ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LockedPage } from '../locked/locked.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  loogoutTimer = new BehaviorSubject(0);
  currentUser: User = null;

  constructor(
    private plt: Platform,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
    ) {
      this.plt.pause.subscribe(() => {
        this.lockApp();
      })
      this.afAuth.onAuthStateChanged(user => {
        console.log('Changed: ', user);
        this.currentUser = user;
      })
    }

  resetLogoutTimer() {
    this.loogoutTimer.next(1800);
    this.decreaseTimer();
  }

  decreaseTimer() {
    setTimeout(() => {
      if (this.loogoutTimer.value == 0) {
        this.lockApp();
      } else {
        this.loogoutTimer.next(this.loogoutTimer.value - 1);
        this.decreaseTimer();
      }
    }, 1000);
  }

  async lockApp() {
    const modal = await this.modalCtrl.create({
      component: LockedPage,
      backdropDismiss: false,
      cssClass: 'login-modal',
      componentProps: {
        isModal: true
      }
    });
    await modal.present();
    modal.onDidDismiss().then(result => {
      if (result.data && result.data.reset) {
        this.resetLogoutTimer();
      }
    })
  }

  async singUp(email: string, password: string, name: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    console.log('result: ', credential);
    const uid = credential.user.uid;

    var user = await this.afAuth.currentUser;
    user.updateProfile({
      displayName: name
    });

    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
      displayName: name
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signInwithBiometricAuth() {
    return this.afAuth.signInAnonymously();
  }

  signOut() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.currentUser ? this.currentUser : null;
  }
}
