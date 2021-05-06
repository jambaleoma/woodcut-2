import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

const { BiometricAuth } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  password = '';
  hasBiometricAuth = false;

  constructor(
    private router: Router) { }

  async ngOnInit() {
    const available = await BiometricAuth.isAvailable()
    this.hasBiometricAuth = available.has;
    if (this.hasBiometricAuth) {
      this.openBiometricAuth();
    }
  }

  async openBiometricAuth() {
    const authResult = await BiometricAuth.verify(
      {
        reason: 'Entra con la tua Impronta o con il FaceId',
        title: 'Entra con la tua Impronta o con il FaceId',
      }
    );
    if (authResult.verified) {
      this.router.navigateByUrl('/inside');
    }
  }

  unlock() {
    if (this.password === '1234') {
      this.router.navigateByUrl('/inside');
    }
  }

}
