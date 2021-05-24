import { Utensil } from './../model/utensil.model';
import { Tool } from './../model/tool.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private toolChange: Tool = {};
  private utensilChange: Tool = {};

  constructor() { }

  public get selectedToolChange(): Tool {
     return this.toolChange;
  }
  public set selectedToolChange(value: Tool) {
      this.toolChange = value;
  }

  public get selectedUtensilChange(): Utensil {
     return this.utensilChange;
  }
  public set selectedUtensilChange(value: Utensil) {
      this.utensilChange = value;
  }
}
