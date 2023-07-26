import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebTrackerComponent } from './web-tracker.component';

const routes: Routes = [{ path: '', component: WebTrackerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebTrackerRoutingModule { }
