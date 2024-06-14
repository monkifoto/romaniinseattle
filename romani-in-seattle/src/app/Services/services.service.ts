import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, mergeMap } from 'rxjs';
import { Service, ServiceWithId } from '../Model/service.model';
import { ServiceType } from '../Model/service-type.model';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore) { }
  private servicesCollection = this.firestore.collection('Services');


  getServices(): Observable<ServiceWithId[]> {
    return this.firestore.collection('Services',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Service;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(map(ser => ser.filter(se => se.Approved == true)));
  }

  getAllServices(): Observable<ServiceWithId[]> {
    return this.firestore.collection('Services',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Service;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getServiceById(id: string): Observable<Service | undefined >  {
    return this.firestore.collection('Services').doc<Service>(id).valueChanges();
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



  addService(service: Service):Observable<ServiceWithId | undefined> {
    const id = this.firestore.createId();
    service['id'] = id;
    service.Date_Created = new Date().toISOString();
    this.firestore.collection('Services').doc(id).set(service);
    return this.firestore.doc<Service>(`Services/${id}`).valueChanges().pipe(
      map(service => service ? { id, ...service } : undefined)
    );
  }

  updateService(id: string, service: Service):Observable<ServiceWithId | undefined> {
    console.log('update', id)
    service.Date_Updated = new Date().toISOString();
    this.firestore.collection('Services').doc(id).update(service);
   // console.log("Update Service: " + id);
    //console.log (service);
    return this.firestore.doc<Service>(`Services/${id}`).valueChanges().pipe(
      map(service => service ? { id, ...service } : undefined)
    );
  }

  // updateAllEntriesWithCurrentDate(): void {
  //   const currentDate = new Date().toISOString();

  //   this.servicesCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const id = a.payload.doc.id;
  //       return { id };
  //     })),
  //     mergeMap(services => from(services)),
  //     mergeMap(service => {
  //       return this.firestore.doc(`Services/${service.id}`).update({ Date_Created: currentDate });
  //     })
  //   ).subscribe({
  //     next: () => console.log('Update successful'),
  //     error: err => console.error('Update failed', err)
  //   });
  // }

   // addServiceWithDate(service: ServiceWithId) {
  //    service.id = this.firestore.createId();
  //    service.Date_Created = new Date().toISOString();
  //   return this.firestore.collection('Services').doc(service.id).set(service);
  // }

  // getServiceById(id: string): Observable<Service | undefined> {
  //   return this.firestore.doc<Service>(`Services/${id}`).valueChanges().pipe(
  //     map(service => service ? { id, ...service } : undefined)
  //   );
  // }

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
}



