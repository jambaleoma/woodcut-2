import { AccessService } from './../services/access.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage {

  logoutTimer = this.accessService.loogoutTimer.asObservable();

  constructor(private accessService: AccessService) { }

  ionViewDidEnter() {
    this.accessService.resetLogoutTimer();
  }

}
