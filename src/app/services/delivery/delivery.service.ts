// delivery.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../../model/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = 'http://localhost:3030/api'; 
  
  constructor(private http: HttpClient) { }
  
  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  getDeliveryById(deliveryId: string): any {
    return this.http.get(`${this.apiUrl}/delivery/${deliveryId}`);
  }

  updateDeliveryStatus(deliveryId: string, status: string): any {
    return this.http.put(`${this.apiUrl}/delivery/${deliveryId}/status`, { status: status });
  }
}
