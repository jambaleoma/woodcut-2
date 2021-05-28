import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../model/user.model';
import { AccessService } from './../services/access.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentUser: User = null;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private accessService: AccessService
  ) { }

  ngOnInit() {
    this.currentUser = this.accessService.getCurrentUser();
  }

  goToGarage() {
    this.router.navigateByUrl('/garage');
  }

  goToMeteo() {
    this.router.navigateByUrl('/meteo');
  }

  singOut() {
    this.accessService.signOut();
    this.router.navigateByUrl('/login');
  }

}
