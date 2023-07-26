import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router'; //

@Component({
  selector: 'app-web-admin-create-delivery',
  templateUrl: './web-admin-create-delivery.component.html',
  styleUrls: ['./web-admin-create-delivery.component.css']
})
export class WebAdminCreateDeliveryComponent {

  newDelivery: any = {}; 
  packageList: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.newDelivery.package_id = ''; 
    this.newDelivery.pickup_time = ''; 
    this.newDelivery.start_time = ''; 
    this.newDelivery.end_time = ''; 
    this.newDelivery.location = ''; 
    this.newDelivery.status = ''; 

    this.http.get<any[]>('http://localhost:3030/api/package')
    .subscribe(data => {
      this.packageList = data;
    });
  }

  createDelivery() {

    this.http.post<any>('http://localhost:3030/api/delivery', this.newDelivery)
      .subscribe(data => {

        console.log('Delivery created successfully.');

        this.router.navigate(['/home']);
      });
  }
}

