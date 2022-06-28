import { AccessService } from './../services/access.service';
import { Router } from '@angular/router';
import { LoadingService } from './../services/loading.service';
import { Utensil } from './../model/utensil.model';
import { Tool, Brand } from './../model/tool.model';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import massiveTools from './../../assets/JSON/tools.json';
import brands from './../../assets/JSON/brands.json';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Camera } = Plugins;

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage {

  utensil: Utensil = {};
  tool: Tool = {
    productDetail: {
      descriptions: []
    },
    brand: {}
  };
  toolForm = false;
  utensilForm = false;
  utensilCard = true;
  toolCard = true;
  showPhoto = false;
  brandsList: Brand[] = [];
  b64photo = '';

  constructor(
    public alertController: AlertController,
    public loadingService: LoadingService,
    private sanitizer: DomSanitizer,
    private afs: AngularFirestore,
    private router: Router,
    private accessService: AccessService
  ) {
    for (const a of brands.brands) {
      this.brandsList.push(a);
    }
  }

  showform(bottonType: string) {
    switch (bottonType) {
      case 'tool':
        this.toolForm = true;
        this.utensilForm = false;
        this.toolCard = true;
        this.utensilCard = false;
        break;
      case 'utensil':
        this.toolForm = false;
        this.utensilForm = true;
        this.toolCard = false;
        this.utensilCard = true;
        break;
    }
  }

  addMassiveTools() {
    console.log(massiveTools.tools);
    for (const t of massiveTools.tools) {
      this.afs.collection('Tool').add(t);
    }
  }

  addTool(f: NgForm) {
    const item = f.value;
    item.brand = {};
    item.brand.name = f.value.brandName;
    delete item.brandName;
    item.productDetail = {};
    item.productDetail.shortDescription = f.value.shortDescription;
    delete item.shortDescription;
    if (this.b64photo !== '') {
      item.imageB64 = this.b64photo;
    }
    item.userUID = this.accessService.getCurrentUser().uid;
    this.afs.collection('Tool').add(item);
    this.loadingService.present();
    setTimeout(() => {
      this.loadingService.dismiss();
      window.location.reload();
    }, 2000);
    f.resetForm();
  }

  addUtensil(f: NgForm) {
    const item: Tool = f.value;
    item.userUID = this.accessService.getCurrentUser().uid;
    this.afs.collection('Utensil').add(item);
    this.loadingService.present();
    setTimeout(() => {
      this.loadingService.dismiss();
      window.location.reload();
    }, 2000);
    f.resetForm();
  }

  async showAllert() {
    const alert = await this.alertController.create({
      header: 'Fatto',
      message: 'Hai creato un nuovo Oggetto!',
      buttons: ['A Posto Cosi!']
    });
    await alert.present();
  }

  async addPicture() {
    const image = await Camera.getPhoto({
      quality: 70,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      saveToGallery: true
    });
    this.b64photo = (this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl)) as any).changingThisBreaksApplicationSecurity;
    this.showPhoto = true;
  }

  removePicture() {
    this.b64photo = '';
    this.showPhoto = false;
  }

  cancel() {
    this.toolForm = false;
    this.utensilForm = false;
    this.toolCard = true;
    this.utensilCard = true;
  }

  backToGarage() {
    this.router.navigate(['/garage']);
  }

}
