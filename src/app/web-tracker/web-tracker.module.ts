import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebTrackerRoutingModule } from './web-tracker-routing.module';
import { WebTrackerComponent } from './web-tracker.component';


@NgModule({
  declarations: [
    WebTrackerComponent
  ],
  imports: [
    CommonModule,
    WebTrackerRoutingModule
  ]
})
export class WebTrackerModule { }
