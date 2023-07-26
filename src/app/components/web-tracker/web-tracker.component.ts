
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



//import { Component, OnInit } from '@angular/core';
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