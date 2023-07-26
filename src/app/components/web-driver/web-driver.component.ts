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
  @ViewChild('wmapContainer', { static: false }) mapElement!: ElementRef;
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
