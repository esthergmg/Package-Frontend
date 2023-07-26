import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../../model/package.model';
import { Delivery } from '../../model/delivery.model';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private baseUrl: string = 'http://localhost:3030/api';

  constructor(private http: HttpClient) {}

  

  getPackageDetails(packageId: string): Observable<Package> {
    const url: string = `${this.baseUrl}/package/${packageId}`;
    return this.http.get<Package>(url);
  }

  getPackageById(packageId: string): any {
    return this.http.get(`${this.baseUrl}/package/${packageId}`);
  }

  getDeliveryDetails(packageId: string): Observable<Delivery> {
    const url: string = `${this.baseUrl}/delivery/${packageId}`;
    return this.http.get<Delivery>(url);
  }

  updateDeliveryStatus(packageId: string, status: string): Observable<Delivery> {
    const url: string = `${this.baseUrl}/delivery/${packageId}`;
    const body = { status: status };
    return this.http.put<Delivery>(url, body);
  }


}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, Subject } from 'rxjs';
// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
// import { map } from 'rxjs/operators';
// import { Package } from '../../model/package.model';
// import { Delivery } from '../../model/delivery.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class PackageService {
//   private baseUrl: string = 'http://localhost:3000'; // Remplacez cette URL par l'URL de votre backend API
//   private websocketSubject: WebSocketSubject<any> | null = null;

//   constructor(private http: HttpClient) {}

//   // Méthode pour récupérer un colis par son ID
//   getPackageById(packageId: string): Observable<Package> {
//     const url: string = `${this.baseUrl}/packages/${packageId}`;
//     return this.http.get<Package>(url);
//   }

//   // Méthode pour récupérer une livraison par son ID
//   getDeliveryById(deliveryId: string): Observable<Delivery> {
//     const url: string = `${this.baseUrl}/deliveries/${deliveryId}`;
//     return this.http.get<Delivery>(url);
//   }

//   // Méthode pour créer une connexion au WebSocket pour les mises à jour de livraison en temps réel
//   connectToWebSocket(packageId: string): Observable<any> {
//     const url: string = `${this.baseUrl}/ws/deliveries/${packageId}`;

//     // Créer une instance de WebSocketSubject pour gérer la connexion WebSocket
//     this.websocketSubject = webSocket(url);

//     // Définir un sujet Observable pour recevoir les mises à jour du WebSocket
//     const updatesSubject = new Subject<any>();

//     // Abonnement pour écouter les messages du WebSocket
//     this.websocketSubject.pipe(map((data: any) => JSON.parse(data))).subscribe((data: any) => {
//       updatesSubject.next(data); // Émettre les mises à jour du WebSocket à travers le sujet Observable
//     });

//     return updatesSubject.asObservable(); // Renvoyer le sujet Observable pour que le composant puisse s'y abonner
//   }

//   // Méthode pour envoyer des mises à jour de localisation du colis via le WebSocket
//   sendLocationUpdate(packageId: string, location: any) {
//     const update = {
//       event: 'location_changed',
//       delivery_id: packageId,
//       location: location,
//     };

//     // Vérifier si le WebSocket est initialisé avant d'envoyer l'objet de mise à jour
//     if (this.websocketSubject) {
//       this.websocketSubject.next(JSON.stringify(update));
//     }
//   }

//   // Méthode pour envoyer des mises à jour d'état du colis via le WebSocket
//   sendStatusUpdate(packageId: string, status: string) {
//     const update = {
//       event: 'status_changed',
//       delivery_id: packageId,
//       status: status,
//     };

//     // Vérifier si le WebSocket est initialisé avant d'envoyer l'objet de mise à jour
//     if (this.websocketSubject) {
//       this.websocketSubject.next(JSON.stringify(update));
//     }
//   }

//   // Méthode pour fermer la connexion WebSocket
//   closeWebSocket() {
//     if (this.websocketSubject) {
//       this.websocketSubject.complete();
//     }
//   }
// }

