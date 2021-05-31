import { FcmService } from './services/fcm.service';
import { UpdateService } from './services/update.service';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private plt: Platform,
    private updateService: UpdateService,
    private fcmService: FcmService
  ) {
    this.plt.ready().then(() => {
      this.updateService.checkForUpdate();
      this.updateService.checkForMantainance();
      this.fcmService.initPush();
    })
  }
}
