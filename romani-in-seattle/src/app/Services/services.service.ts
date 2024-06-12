import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Service, ServiceWithId } from '../Model/service.model';
import { ServiceType } from '../Model/service-type.model';


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

  getServiceById(id: string): Observable<Service | undefined> {
    return this.firestore.doc<Service>(`services/${id}`).valueChanges().pipe(
      map(service => service ? { id, ...service } : undefined)
    );
  }


  getServicesByType(serviceType: string): Observable<ServiceWithId[]> {
    return this.firestore.collection<ServiceWithId>('Services', ref => ref.where('Service_Type', '==', serviceType)).valueChanges();
  }

  getAllServiceTypes(): Observable<string[]> {
    return this.firestore.collection<ServiceType>('ListOfServices').valueChanges().pipe(
      map(services => {
        const serviceTypes = services.map(svType => svType.Name);
        return Array.from(new Set(serviceTypes));
      })
    );
  }

  addServiceWithDate(service: ServiceWithId) {
     service.id = this.firestore.createId();
     const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
     service.Date_Created = today;
   // console.log("Firestore ID: " + service.id);
    return this.firestore.collection('Services').doc(service.id).set(service);
  }

  addService(service: Service):Observable<ServiceWithId | undefined> {
    const id = this.firestore.createId();
    service['id'] = id;
    this.firestore.collection('Services').doc(id).set(service);
    return this.firestore.doc<Service>(`Services/${id}`).valueChanges().pipe(
      map(service => service ? { id, ...service } : undefined)
    );
  }

  updateService(id: string, service: Service): Promise<void> {
    console.log("Update Service: " + id);
    console.log (service);
    return this.firestore.collection('Services').doc(id).update(service);
  }
}



