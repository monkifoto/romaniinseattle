import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';


interface Service {
  Name: string;
  Service_Type: string;
  Phone_Number: string;
  Email:string;
  Description:string;
  Website:string;
  Community_Sponsor: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore) { }

  getServices(): Observable<Service[]> {
    return this.firestore.collection<Service>('Services',ref=>ref.orderBy('Community_Sponsor','desc')).valueChanges();
  }


  getServicesByType(serviceType: string): Observable<Service[]> {
    return this.firestore.collection<Service>('Services', ref => ref.where('Service_Type', '==', serviceType)).valueChanges();
  }

  getAllServiceTypes(): Observable<string[]> {
    return this.firestore.collection<Service>('Services').valueChanges().pipe(
      map(services => {
        const serviceTypes = services.map(service => service.Service_Type);
        return Array.from(new Set(serviceTypes));
      })
    );
  }
}



