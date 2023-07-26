import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-web-admin-home',
  templateUrl: './web-admin-home.component.html',
  styleUrls: ['./web-admin-home.component.css']
})

export class WebAdminHomeComponent implements OnInit{

  packageList: any[] = [];
  deliveredList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
    this.http.get<any[]>('http://localhost:3030/api/package')
      .subscribe(data => {
        this.packageList = data;
      });

    this.http.get<any[]>('http://localhost:3030/api/delivery')
      .subscribe(data => {
        this.deliveredList = data;
      });
  }

  

}
