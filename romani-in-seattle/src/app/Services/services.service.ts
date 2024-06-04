import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Service, ServiceWithId } from '../Model/service.model';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore) { }

  // getServices(): Observable<Service[]> {
  //   return this.firestore.collection<Service>('Services',ref=>ref.orderBy('Community_Sponsor','desc')).valueChanges();
  // }

  // getServices(): Observable<Ser[]> {
  //   return this.firestore.collection('Services',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Service;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  // }

  getServices(): Observable<ServiceWithId[]> {
    return this.firestore.collection('Services',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Service;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  getService(id: string): Observable<Service | undefined >  {
    return this.firestore.collection('Services').doc<Service>(id).valueChanges();
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

  addService(service: Service): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('Services').doc(id).set(service);
  }

  updateService(id: string, service: Service): Promise<void> {
    return this.firestore.collection('services').doc(id).update(service);
  }
}



