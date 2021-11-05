import { AccessService } from './../services/access.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Tool } from 'src/app/model/tool.model';
import { Utensil } from 'src/app/model/utensil.model';
import { LoadingService } from 'src/app/services/loading.service';
import { ItemService } from 'src/app/services/item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage {

  tools: Tool[] = [];
  utensils: Utensil[] = [];
  toolsStore: Observable<any>;
  utensilsStore: Observable<any>;
  showtools = false;
  toolCard = true;
  utensilCard = true;
  toolArchive = false;
  utensilArchive = false;

  constructor(
    public loadingService: LoadingService,
    private router: Router,
    private itemService: ItemService,
    private afs: AngularFirestore,
    private accessService: AccessService
  ) {
    this.loadingService.present();
    // Getting Tools data
    this.toolsStore = this.afs.collection('Tool', ref => ref.orderBy('name')).valueChanges({idField: 'id'});
    this.toolsStore.subscribe((tools) => {
      this.loadingService.dismiss();
      this.tools = tools.filter((tool) => tool.userUID === this.accessService.getCurrentUser()?.uid);
    });
    // Getting Utensil data
    this.utensilsStore = this.afs.collection('Utensil', ref => ref.orderBy('name')).valueChanges({idField: 'id'});
    this.utensilsStore.subscribe((utensils) => {
      this.loadingService.dismiss();
      this.utensils = utensils.filter((utensil) => utensil.userUID === this.accessService.getCurrentUser()?.uid);
    });
  }

  eliminaAttrezzo(tool: Tool){
    this.afs.collection('Tool').doc(tool.id).delete();
    this.loadingService.present();
    setTimeout(() => {
      this.loadingService.dismiss();
      window.location.reload();
    }, 2000);
  }

  eliminaUtensile(utensil: Utensil){
    this.afs.collection('Utensil').doc(utensil.id).delete();
    this.loadingService.present();
    setTimeout(() => {
      this.loadingService.dismiss();
      window.location.reload();
    }, 2000);
  }

  openToolDetails(item: Tool) {
    this.router.navigate(['/dettaglioOggetto']);
    this.itemService.selectedUtensilChange = {};
    this.itemService.selectedToolChange = item;
  }

  openUtensilDetails(item: Utensil) {
    this.router.navigate(['/dettaglioOggetto']);
    this.itemService.selectedToolChange = {};
    this.itemService.selectedUtensilChange = item;
  }

  showArchive(bottonType: string) {
    switch (bottonType) {
      case 'tool':
        this.toolCard = true;
        this.utensilCard = false;
        this.toolArchive = true;
        this.utensilArchive = false;
        break;
      case 'utensil':
        this.toolCard = false;
        this.utensilCard = true;
        this.toolArchive = false;
        this.utensilArchive = true;
        break;
      case 'back':
        this.toolCard = true;
        this.utensilCard = true;
        this.toolArchive = false;
        this.utensilArchive = false;
        break;
    }
  }

  backToGarage() {
    this.router.navigateByUrl('/garage');
  }
}
