import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router'
@Component({
  selector: 'app-web-admin-create-package',
  templateUrl: './web-admin-create-package.component.html',
  styleUrls: ['./web-admin-create-package.component.css']
})
export class WebAdminCreatePackageComponent {

  newPackage: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.newPackage.description = ''; 
    this.newPackage.weight = 0;
    this.newPackage.width = 0; 
    this.newPackage.height = 0; 
    this.newPackage.depth = 0; 
    this.newPackage.from_name = ''; 
    this.newPackage.from_address = '';
    this.newPackage.to_name = ''; 
    this.newPackage.to_address = ''; 
  }

  createPackage() {

    this.http.post<any>('http://localhost:3030/api/package', this.newPackage)
      .subscribe(data => {

        console.log('Package created successfully.');

        this.router.navigate(['/home']);
      });
  }
}
