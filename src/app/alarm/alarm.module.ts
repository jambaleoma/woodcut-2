import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlarmPageRoutingModule } from './alarm-routing.module';
import { AlarmPage } from './alarm.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmPageRoutingModule,
    NgCircleProgressModule.forRoot({})
  ],
  declarations: [AlarmPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AlarmPageModule {}
