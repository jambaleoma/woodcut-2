

import { Platform, ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LockedPage } from '../locked/locked.page';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  loogoutTimer = new BehaviorSubject(0);

  constructor(
    private plt: Platform,
    private modalCtrl: ModalController) {
      this.plt.pause.subscribe(() => {
        this.lockApp();
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
}
