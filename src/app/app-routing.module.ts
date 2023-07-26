import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebTrackerComponent } from './components/web-tracker/web-tracker.component';
import { WebDriverComponent } from './components//web-driver/web-driver.component';
import { WebAdminHomeComponent } from './components/web-admin-home/web-admin-home.component';
import { WebAdminCreatePackageComponent } from './components/web-admin-create-package/web-admin-create-package.component';
import { WebAdminCreateDeliveryComponent } from './components/web-admin-create-delivery/web-admin-create-delivery.component';

const routes: Routes = [
  { path: '', redirectTo: '/tracker', pathMatch: 'full' },
  { path: 'tracker', component: WebTrackerComponent },
  { path: 'driver', component: WebDriverComponent },
  { path: 'web-admin', component: WebAdminHomeComponent },
  { path: 'web-admin-create-package', component: WebAdminCreatePackageComponent },
  { path: 'web-admin-create-delivery', component: WebAdminCreateDeliveryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// app-routing.module.ts

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [


//   { path: 'web-tracker', loadChildren: () => import('./web-tracker/web-tracker.component').then(m => m.WebTrackerComponent) },
//   { path: 'web-driver', loadChildren: () => import('./web-driver/web-driver.module').then(m => m.WebDriverModule) },
//   // { path: 'web-admin', loadChildren: () => import('./web-admin/web-admin.module').then(m => m.WebAdminModule) },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
