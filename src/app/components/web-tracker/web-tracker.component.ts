// import { Component, OnInit } from '@angular/core';
// import { PackageService } from '../../services/package/package.service';
// import { WebsocketService } from '../../services/websocket/websocket.service';
// import { Package } from '../../model/package.model';
// import { Delivery } from '../../model/delivery.model';

// @Component({
//   selector: 'app-web-tracker',
//   templateUrl: './web-tracker.component.html',
//   styleUrls: ['./web-tracker.component.css'],
// })
// export class WebTrackerComponent implements OnInit {
//   packageId: string = '';
//   package: Package | null = null;
//   delivery: Delivery | null = null;

//   constructor(
//     private packageService: PackageService,
//     private websocketService: WebsocketService
//   ) {}

//   ngOnInit() {}

//   trackPackage() {
//     // Appeler le service packageService pour obtenir les détails du colis en fonction de packageId
//     this.packageService.getPackageDetails(this.packageId).subscribe((data) => {
//       this.package = data;
//     });

//     // Appeler le service packageService pour obtenir les détails de la livraison en fonction de packageId
//     this.packageService.getDeliveryDetails(this.packageId).subscribe((data) => {
//       this.delivery = data;
//     });

//     // Créer une connexion au WebSocket pour les mises à jour de livraison en temps réel
//     this.websocketService.connectToWebSocket(this.packageId).subscribe((data) => {
//       this.delivery = data;
//     });
//   }

//   // Méthode pour mettre à jour l'état de la livraison
//   updateDeliveryStatus(status: string) {
//     // Appeler le service packageService pour mettre à jour l'état de la livraison en fonction de packageId et status
//     this.packageService.updateDeliveryStatus(this.packageId, status).subscribe((data) => {
//       this.delivery = data;
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { DeliveryService } from '../../services/delivery/delivery.service';
// import { PackageService } from '../../services/package/package.service';
// import { WebsocketService } from '../../services/websocket/websocket.service';
// import { Package } from '../../model/package.model';
// import { Delivery } from '../../model/delivery.model';


// @Component({
//   selector: 'app-web-tracker',
//   templateUrl: './web-tracker.component.html',
//   styleUrls: ['./web-tracker.component.css']
// })
// export class WebTrackerComponent implements OnInit {
//   packages: Package[] = [];
//   selectedPackage: Package | null = null;
//   selectedDelivery: Delivery | null = null;

//   constructor(
//     private packageService: PackageService,
//     private deliveryService: DeliveryService,
//     private websocketService: WebsocketService
//   ) {}

//   ngOnInit(): void {
//     this.getPackages();
//     this.subscribeToUpdates();
//   }

//   getPackages(): void {
//     this.packageService.getPackages().subscribe((packages) => {
//       this.packages = packages;
//       this.selectedPackage = this.packages.length > 0 ? this.packages[0] : null;
//       if (this.selectedPackage) {
//         this.getDelivery(this.selectedPackage._id);
//       }
//     });
//   }

//   selectPackage(selectedPackage: Package): void {
//     this.selectedPackage = selectedPackage;
//     this.selectedDelivery = null;
//     if (selectedPackage) {
//       this.getDelivery(selectedPackage._id);
//     }
//   }

//   getDelivery(packageId: string): void {
//     this.deliveryService.getDeliveryByPackageId(packageId).subscribe((delivery) => {
//       this.selectedDelivery = delivery;
//     });
//   }

//   private subscribeToUpdates(): void {
//     const socket = this.websocketService.getSocket();
//     socket.subscribe((update: any) => {
//       const { packageId, ...delivery } = update;
//       const foundPackage = this.packages.find((p) => p._id === packageId);
//       if (foundPackage) {
//         foundPackage.status = delivery.status || foundPackage.status;
//         foundPackage.from_address = delivery.from_address || foundPackage.from_address;
//         foundPackage.to_address = delivery.to_address || foundPackage.to_address;
//         if (this.selectedPackage?._id === packageId) {
//           this.selectedDelivery = delivery;
//         }
//       }
//     });
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { PackageService } from '../../services/package/package.service';
// import { WebsocketService } from '../../services/websocket/websocket.service';
// import { Package } from '../../model/package.model';
// import { Delivery } from '../../model/delivery.model';

// @Component({
//   selector: 'app-web-tracker',
//   templateUrl: './web-tracker.component.html',
//   styleUrls: ['./web-tracker.component.css']
// })
// export class WebTrackerComponent implements OnInit {
//   packageId: string = '';
//   package: Package | null = null;
//   deliveryId: string = '';
//   delivery: Delivery | null = null;

//   constructor(private packageService: PackageService) {}

//   ngOnInit() {
//     // Initialisation du composant ici...
//   }

//   searchPackage() {
//     this.packageService.getPackageById(this.packageId).subscribe(
//       (data: Package) => {
//         this.package = data;
//       },
//       (error) => {
//         console.error('Error fetching package:', error);
//         // Gérer les erreurs ici...
//       }
//     );
//   }

//   searchDelivery() {
//     this.packageService.getDeliveryById(this.deliveryId).subscribe(
//       (data: Delivery) => {
//         this.delivery = data;
//       },
//       (error) => {
//         console.error('Error fetching delivery:', error);
//         // Gérer les erreurs ici...
//       }
//     );
//   }

//   sendLocationUpdate() {
//     if (this.package && this.package.from_location && this.package.to_location) {
//       const currentLocation = {
//         lat: 40.7128, // Latitude (par exemple, 40.7128 pour New York)
//         lng: -74.0060 // Longitude (par exemple, -74.0060 pour New York)
//       };
//       this.packageService.sendLocationUpdate(this.package._id, currentLocation);
//     } else {
//       console.error('Invalid package details or location.');
//       // Gérer les erreurs ici...
//     }
//   }

//   sendStatusUpdate(status: string) {
//     if (this.package) {
//       this.packageService.sendStatusUpdate(this.package._id, status);
//     } else {
//       console.error('Invalid package details.');
//       // Gérer les erreurs ici...
//     }
//   }

//   closeWebSocket() {
//     this.packageService.closeWebSocket();
//   }
// }

// web-tracker.component.ts

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { io } from 'socket.io-client';

// @Component({
//   selector: 'app-web-tracker',
//   templateUrl: './web-tracker.component.html',
//   styleUrls: ['./web-tracker.component.css']
// })
// export class WebTrackerComponent implements OnInit {
//   public packageId: string = '';
//   public package: any;
//   public delivery: any;
//   public socket: any;
//   public map: any;

//   constructor(private http: HttpClient) {
//     this.socket = io('http://localhost:3001');
//   }

//   ngOnInit(): void {
//     this.initMap();
//   }

//   initMap(): void {
//     this.map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 12,
//       center: { lat: 0, lng: 0 }
//     });
//   }

//   trackPackage(): void {
//     if (this.packageId) {
//       this.getPackageDetails(this.packageId);
//     }
//   }

//   getPackageDetails(packageId: string): void {
//     this.http.get<any>(`http://localhost:3000/api/package/${packageId}`).subscribe(
//       data => {
//         this.package = data;
//         if (this.package.active_delivery_id) {
//           this.getDeliveryDetails(this.package.active_delivery_id);
//         } else {
//           this.delivery = null;
//         }
//       },
//       error => {
//         console.error('Error fetching package details:', error);
//       }
//     );
//   }

//   getDeliveryDetails(deliveryId: string): void {
//     this.http.get<any>(`http://localhost:3000/api/delivery/${deliveryId}`).subscribe(
//       data => {
//         this.delivery = data;
//         this.updateMap();
//         this.listenForDeliveryUpdates();
//       },
//       error => {
//         console.error('Error fetching delivery details:', error);
//       }
//     );
//   }

//   listenForDeliveryUpdates(): void {
//     this.socket.on('delivery_updated', (data: any) => {
//       if (data.event === 'status_changed' && data.delivery_id === this.delivery.delivery_id) {
//         this.delivery.status = data.status;
//       } else if (data.event === 'location_changed' && data.delivery_id === this.delivery.delivery_id) {
//         this.delivery.location = data.location;
//         this.updateMap();
//       }
//     });
//   }

//   updateMap(): void {
//     if (this.delivery && this.delivery.location) {
//       const marker = new google.maps.Marker({
//         position: this.delivery.location,
//         map: this.map,
//         title: 'Delivery Location'
//       });
//       this.map.setCenter(this.delivery.location);
//     }
//   }

// }

//   /// <reference types="@types/googlemaps" />

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { io } from 'socket.io-client';
// import { DeliveryService } from '../../services/delivery/delivery.service';
// import { GeolocationService } from '../../services/geolocation/geolocation.service';
// import { PackageService } from '../../services/package/package.service';
// import { WebsocketService } from '../../services/websocket/websocket.service';

// @Component({
//   selector: 'app-web-tracker',
//   templateUrl: './web-tracker.component.html',
//   styleUrls: ['./web-tracker.component.css']
// })
// export class WebTrackerComponent implements OnInit {
//   public package: any;
//   public delivery: any;
//   public socket: any;
//   public packageId: string = '';
//   public map: any;

//   constructor(
//     private route: ActivatedRoute,
//     private packageService: PackageService,
//     private deliveryService: DeliveryService,
//     private geolocationService: GeolocationService,
//     private websocketService: WebsocketService
//   ) {
//     this.socket = this.websocketService.connect();
//   }

//   ngOnInit(): void {
//     const deliveryId = this.route.snapshot.paramMap.get('id');
//     if (deliveryId !== null) {
//       this.getDeliveryDetails(deliveryId);
//     }
//   }

//   trackPackage(): void {
//     if (this.packageId) {
//       this.packageService.getPackageById(this.packageId).subscribe((data: any) => {
//         this.package = data.package;
//         if (this.package?.active_delivery_id) {
//           this.getDeliveryDetails(this.package.active_delivery_id);
//           // Subscribe to delivery updates via WebSocket
//           this.socket.on('delivery_updated', (data: any) => {
//             if (data.event === 'update_delivery_status') {
//               this.delivery = data.delivery_object;
//               this.updateMap();
//             }
//           });
//         }
//       });
//     }
//   }

//   getDeliveryDetails(deliveryId: string): void {
//     this.deliveryService.getDeliveryById(deliveryId).subscribe((data: any) => {
//       this.delivery = data.delivery;
//       this.updateMap();
//     });
//   }

//   updateMap(): void {
//     if (this.delivery && this.delivery.location) {
//       const marker = new google.maps.Marker({
//         position: this.delivery.location,
//         map: this.map,
//         title: 'Delivery Location'
//       });
//       this.map.setCenter(this.delivery.location);
//     }
//   }
// }
// 222222222222222222 @@@@@@@@@@@@@@@@@@@@@@
// /// <reference types="@types/googlemaps" />

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { io } from 'socket.io-client';
// import { DeliveryService } from '../../services/delivery/delivery.service';
// import { GeolocationService } from '../../services/geolocation/geolocation.service';
// import { PackageService } from '../../services/package/package.service';
// import { WebsocketService } from '../../services/websocket/websocket.service';

// @Component({
//   selector: 'app-web-tracker',
//   templateUrl: './web-tracker.component.html',
//   styleUrls: ['./web-tracker.component.css']
// })
// export class WebTrackerComponent implements OnInit {
//   public package: any;
//   public delivery: any;
//   public socket: any;
//   public packageId: string = '';
//   public map: any;

//   constructor(
//     private route: ActivatedRoute,
//     private packageService: PackageService,
//     private deliveryService: DeliveryService,
//     private geolocationService: GeolocationService,
//     private websocketService: WebsocketService
//   ) {
//     this.socket = this.websocketService.connect();
//   }

//   ngOnInit(): void {
//     const deliveryId = this.route.snapshot.paramMap.get('id');
//     if (deliveryId !== null) {
//       this.getDeliveryDetails(deliveryId);
//     }
//   }

//   trackPackage(): void {
//     if (this.packageId) {
//       this.packageService.getPackageById(this.packageId).subscribe((data: any) => {
//         this.package = data.package;
//         if (this.package?.active_delivery_id) {
//           this.getDeliveryDetails(this.package.active_delivery_id);
//           // Subscribe to delivery updates via WebSocket
//           this.socket.on('delivery_updated', (data: any) => {
//             if (data.event === 'update_delivery_status') {
//               this.delivery = data.delivery_object;
//               this.updateMap();
//             }
//           });
//         }
//       });
//     }
//   }

//   getDeliveryDetails(deliveryId: string): void {
//     this.deliveryService.getDeliveryById(deliveryId).subscribe((data: any) => {
//       this.delivery = data.delivery;
//       this.updateMap();
//     });
//   }

//   updateMap(): void {
//     if (this.map) {
//       this.map.setCenter(this.delivery.location);
//       const marker = new google.maps.Marker({
//         position: this.delivery.location,
//         map: this.map,
//         title: 'Delivery Location'
//       });
//     }
//   }
// }

   /// <reference types="@types/googlemaps" />

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from '../../services/delivery/delivery.service';
import { PackageService } from '../../services/package/package.service';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-web-tracker',
  templateUrl: './web-tracker.component.html',
  styleUrls: ['./web-tracker.component.css']
})
export class WebTrackerComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapElement!: ElementRef;
  public package: any; 
  public delivery: any; 
  public socket: any; 
  public packageId: string = '';
  public map!: google.maps.Map; 
  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private deliveryService: DeliveryService,
    private websocketService: WebsocketService
  ) {
    this.socket = this.websocketService.connect(); 
  }

  ngOnInit(): void {
    const deliveryId = this.route.snapshot.paramMap.get('id');
    if (deliveryId !== null) {
      this.getDeliveryDetails(deliveryId);
    }
  }

  trackPackage(): void {
    if (this.packageId) {
      this.packageService.getPackageById(this.packageId).subscribe((data: any) => {
        this.package = data.package;
        if (this.package?.active_delivery_id) {
          this.getDeliveryDetails(this.package.active_delivery_id);
          // Subscribe to delivery updates via WebSocket
          this.socket.on('delivery_updated', (data: any) => {
            if (data.event === 'update_delivery_status') {
              this.delivery = data.delivery_object;
              this.updateMap();
            }
          });
        }
      });
    }
  }

  getDeliveryDetails(deliveryId: string): void {
    this.deliveryService.getDeliveryById(deliveryId).subscribe((data: any) => {
      this.delivery = data.delivery;
      this.updateMap();
    });
  }

  updateMap(): void {
    if (this.delivery && this.delivery.location) {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: this.delivery.location.lat, lng: this.delivery.location.lng },
        zoom: 12,
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      const deliveryMarker = new google.maps.Marker({
        position: this.delivery.location,
        map: this.map,
        title: 'Delivery Location'
      });
    }
  }
}



 