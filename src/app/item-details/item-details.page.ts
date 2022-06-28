import { Utensil } from './../model/utensil.model';
import { Tool, Brand } from './../model/tool.model';
import { ItemService } from './../services/item.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import brands from '../../assets/JSON/brands.json';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  public tool: Tool = {};
  public utensil: Utensil = {};
  public isDesktop: boolean;
  public element: any;
  public brandsList: Brand[] = brands.brands;

  constructor(
    private router: Router,
    private itemService: ItemService
  ) {
    this.tool = this.itemService.selectedToolChange;
    this.utensil = this.itemService.selectedUtensilChange;
  }

  ngOnInit() {
    registerLocaleData(localeIt, 'it-IT');
  }

  backToArchive() {
    this.router.navigate(['/archive']);
  }

  showLabelValue(code: string) {
    this.element = document.getElementById(code);
    if (this.element.style.display === 'block') {
      this.element.style.display = 'none';
    } else {
      this.element.style.display = 'block';
    }
  }

  takeBrandLogo(name: string) {
    let base64LogoString = '';
    base64LogoString = this.brandsList.find((b) => b.name === name).logoB64;
    return base64LogoString;
  }

}
