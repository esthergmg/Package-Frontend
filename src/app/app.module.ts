import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes }   from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { WebTrackerComponent } from './components/web-tracker/web-tracker.component';
import { PackageDetailsComponent } from './components/package-details/package-details.component';
import { DeliveryDetailsComponent } from './components/delivery-details/delivery-details.component';
import { WebAdminHomeComponent } from './components/web-admin-home/web-admin-home.component';
import { WebAdminCreateDeliveryComponent } from './components/web-admin-create-delivery/web-admin-create-delivery.component';
import { WebAdminCreatePackageComponent } from './components/web-admin-create-package/web-admin-create-package.component';
import { WebDriverComponent } from './components/web-driver/web-driver.component';
import { GeolocationService } from './services/geolocation/geolocation.service';

@NgModule({
  declarations: [
    AppComponent,
    WebTrackerComponent,
    PackageDetailsComponent,
    DeliveryDetailsComponent,
    WebAdminHomeComponent,
    WebAdminCreateDeliveryComponent,
    WebAdminCreatePackageComponent,
    WebDriverComponent,

    
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    CommonModule,
    DatePipe,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatDividerModule,
  ],
  providers: [GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
