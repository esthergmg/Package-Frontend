import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() {}

  getCurrentLocation(): any {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            resolve(position.coords);
          },
          (error: GeolocationPositionError) => {
            reject(error.message);
          }
        );
      } else {
        reject('Geolocation not available');
      }
    });
  }
}
