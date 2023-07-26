// import { Injectable } from '@angular/core';
// import { io } from 'socket.io-client';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService {
//   private socket: any;

//   constructor() { }

//   connect(): any {
//     this.socket = io('http://localhost:3000');

//     this.socket.on('connect', () => {
//       console.log('Connected to WebSocket server');
//     });

//     this.socket.on('disconnect', () => {
//       console.log('Disconnected from WebSocket server');
//     });

//     return this.socket;
//   }
// }

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: Socket;

  constructor() {}

  // Méthode pour initialiser la connexion WebSocket
  connect(): Socket {
    this.socket = io('http://localhost:3000'); // Remplacez l'URL par votre URL de serveur Socket.IO
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
    return this.socket;
  }

  // Méthode pour envoyer la mise à jour de géolocalisation via WebSocket
  sendLocationUpdate(payload: any): void {
    this.socket.emit('update_location', payload);
  }

  // Méthode pour recevoir les mises à jour de géolocalisation via WebSocket
  getLocationUpdates(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('location_updated', (data: any) => {
        observer.next(data);
      });
    });
  }

  sendStatusUpdate(payload: any): void {
    this.socket.emit('update_status', payload);
  }

  getStatusUpdates(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('status_updated', (data: any) => {
        observer.next(data);
      });
    });
  }

  getDeliveryUpdates(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('delivery_updated', (data: any) => {
        observer.next(data);
      });
    });
  }
}

