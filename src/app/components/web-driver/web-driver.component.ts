// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { io } from "socket.io-client";
// import { DeliveryService } from '../../services/delivery/delivery.service';
// import { GeolocationService } from '../../services/geolocation/geolocation.service';
// import { PackageService } from '../../services/package/package.service';
// import { WebsocketService } from '../../services/websocket/websocket.service';
// import { Subscription } from 'rxjs';


// @Component({
//   selector: 'app-web-driver',
//   templateUrl: './web-driver.component.html',
//   styleUrls: ['./web-driver.component.css']
// })
// export class WebDriverComponent implements OnInit {
//   public package: any; // Variable pour stocker les détails du colis
//   public delivery: any; // Variable pour stocker les détails de la livraison
//   public socket: any; // Variable pour gérer la connexion WebSocket
//   public locationSubscription: Subscription | undefined; // Abonnement pour les mises à jour de géolocalisation
//   public currentLocation: any; // Variable pour stocker la position actuelle du conducteur

//   constructor(
//     private route: ActivatedRoute,
//     private packageService: PackageService,
//     private deliveryService: DeliveryService, // Utiliser le DeliveryService pour interagir avec l'API
//     private geolocationService: GeolocationService,
//     private websocketService: WebsocketService
//   ) {
//     this.socket = this.websocketService.connect(); // Initialiser la connexion WebSocket
//   }

//   ngOnInit(): void {
//     // Récupérer l'ID de livraison à partir des paramètres d'URL
//     const deliveryId = this.route.snapshot.paramMap.get('id');

//     // Charger les détails de la livraison en utilisant l'API backend
//     if (deliveryId !== null) {
//       this.getDeliveryDetails(deliveryId);
//     }

//     // Abonnement aux mises à jour de la géolocalisation toutes les 20 secondes
//     this.locationSubscription = this.geolocationService.getCurrentLocation().subscribe((location: any) => {
//       this.currentLocation = location;
//       // Envoyer la mise à jour de géolocalisation via WebSocket
//       this.sendLocationUpdate(this.delivery.delivery_id, location);
//     });
//   }

//   // Méthode pour récupérer les détails de la livraison à partir de l'API backend
//   getDeliveryDetails(deliveryId: string): void {
//     this.deliveryService.getDeliveryById(deliveryId).subscribe((data: any) => {
//       this.delivery = data.delivery;
//       // Une fois que nous avons les détails de la livraison, récupérer les détails du colis associé
//       this.getPackageDetails(this.delivery.package_id);
//     });
//   }

//   // Méthode pour récupérer les détails du colis associé à la livraison
//   getPackageDetails(packageId: string): void {
//     this.packageService.getPackageById(packageId).subscribe((data: any) => {
//       this.package = data.package;
//     });
//   }

//   // Méthode pour envoyer la mise à jour de géolocalisation via WebSocket
//   sendLocationUpdate(deliveryId: string, location: any): void {
//     const payload = {
//       event: 'location_changed',
//       delivery_id: deliveryId,
//       location: location
//     };
//     this.socket.emit('update_location', payload);
//   }

  
//   updateDeliveryStatus(status: string): void {
//     const payload = {
//       event: 'status_changed',
//       delivery_id: this.delivery.delivery_id,
//       status: status
//     };
//     this.socket.emit('update_status', payload);
//   }

//   ngOnDestroy(): void {
//     // Se désabonner de l'abonnement aux mises à jour de la géolocalisation lorsque le composant est détruit
//     if (this.locationSubscription) {
//       this.locationSubscription.unsubscribe();
//     }
//   }
// }


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from '../../services/delivery/delivery.service';
import { PackageService } from '../../services/package/package.service';
import { WebsocketService } from '../../services/websocket/websocket.service';

declare const google: any;

@Component({
  selector: 'app-web-driver',
  templateUrl: './web-driver.component.html',
  styleUrls: ['./web-driver.component.css']
})
export class WebDriverComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapElement!: ElementRef;
  public delivery: any;
  public package: any;
  public socket: any;
  public deliveryId: string = '';
  public currentLocation: any;
  public map: any;

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

    
    setInterval(() => {
      this.getCurrentLocation();
    }, 20000);
  }

  searchDelivery(): void {
    if (this.deliveryId) {
      this.getDeliveryDetails(this.deliveryId);
    }
  }

  getDeliveryDetails(deliveryId: string): void {
    this.deliveryService.getDeliveryById(deliveryId).subscribe((data: any) => {
      this.delivery = data.delivery;
      this.getPackageDetails(this.delivery.package_id);
      this.createMap();
    });
  }

  getPackageDetails(packageId: string): void {
    this.packageService.getPackageById(packageId).subscribe((data: any) => {
      this.package = data.package;
    });
  }

  createMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 8,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    if (this.package) {
      
      const sourceMarker = new google.maps.Marker({
        position: { lat: this.package.from_location.lat, lng: this.package.from_location.lng },
        map: this.map,
        title: 'Package Source Location',
      });

      
      const destinationMarker = new google.maps.Marker({
        position: { lat: this.package.to_location.lat, lng: this.package.to_location.lng },
        map: this.map,
        title: 'Package Destination Location',
      });
    }

    if (this.delivery && this.delivery.location) {
      const deliveryMarker = new google.maps.Marker({
        position: this.delivery.location,
        map: this.map,
        title: 'Current Delivery Location'
      });
      this.map.setCenter(this.delivery.location);
    }
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.socket.emit('update_delivery_location', {
          delivery_id: this.delivery.delivery_id,
          location: this.currentLocation
        });
      });
    }
  }

  changeStatus(newStatus: string): void {
    if (this.delivery && this.delivery.status !== newStatus) {
      this.socket.emit('update_delivery_status', {
        delivery_id: this.delivery.delivery_id,
        status: newStatus
      });
    }
  }

  ngOnDestroy(): void {
    
  }
}
