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

  createPackage() {
    // Code pour créer un nouveau colis
    // const newPackage = {
    //   description: 'Nouveau colis',
    //   weight: 1000,
    //   width: 20,
    //   height: 10,
    //   depth: 15,
    //   from_name: 'Expéditeur',
    //   from_address: 'Adresse de l\'expéditeur',
    //   from_location: { lat: 37.7749, lng: -122.4194 },
    //   to_name: 'Destinataire',
    //   to_address: 'Adresse du destinataire',
    //   to_location: { lat: 40.7128, lng: -74.0060 }
    // };

    // // Appeler l'API REST pour créer le nouveau colis
    // this.http.post<any>('http://localhost:3030/api/packages', newPackage)
    //   .subscribe(data => {
    //     // Réponse de l'API après la création du colis
    //     // Mettez à jour la liste des colis avec le nouveau colis créé
    //     this.packageList.push(data);
    //   });
  }

  createDelivered() {
    // // Code pour créer un nouveau colis livré
    // const newDelivered = {
    //   description: 'Nouveau colis livré',
    //   weight: 1200,
    //   width: 15,
    //   height: 8,
    //   depth: 12,
    //   from_name: 'Expéditeur 2',
    //   from_address: 'Adresse de l\'expéditeur 2',
    //   from_location: { lat: 37.7749, lng: -122.4194 },
    //   to_name: 'Destinataire 2',
    //   to_address: 'Adresse du destinataire 2',
    //   to_location: { lat: 40.7128, lng: -74.0060 },
    //   delivery_time: new Date().toISOString(),
    //   status: 'delivered'
    // };

    // // Appeler l'API REST pour créer le nouveau colis livré
    // this.http.post<any>('http://localhost:3030/api/delivered', newDelivered)
    //   .subscribe(data => {
    //     // Réponse de l'API après la création du colis livré
    //     // Mettez à jour la liste des colis livrés avec le nouveau colis livré créé
    //     this.deliveredList.push(data);
    //   });
  }

}
