import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, from, map, mergeMap, throwError } from 'rxjs';
import { Service, ServiceWithId } from '../Model/service.model';
import { ServiceType } from '../Model/service-type.model';
import { ErrorLoggingService } from './error-logging.service';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore, private errorLoggingService: ErrorLoggingService) { }
  private servicesCollection = this.firestore.collection('Services');


  getServices(): Observable<ServiceWithId[]> {
    return this.firestore.collection('Services',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Service;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(map(ser => ser.filter(se => se.Approved == true))).pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getApprovedServices');
        return throwError(() => new Error(error));
      })
    );
  }

  getAllServices(): Observable<ServiceWithId[]> {
    return this.firestore.collection('Services',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Service;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getAllServices');
        return throwError(() => new Error(error));
      })
    );
  }

  getServiceById(id: string): Observable<Service | undefined >  {
    return this.servicesCollection.doc<Service>(id).valueChanges().pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getGetServiceById: ' + id);
        return throwError(() => new Error(error));
      })
    );
  }


  getServicesByType(serviceType: string): Observable<ServiceWithId[]> {
    return this.firestore.collection<ServiceWithId>('Services', ref => ref.where('Service_Type', '==', serviceType).orderBy('Community_Sponsor','desc')).valueChanges().pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getServiceByServiceType: ' + serviceType);
        return throwError(() => new Error(error));
      })
    );
  }

  getAllServiceTypes(): Observable<string[]> {
    return this.firestore.collection<ServiceType>('ListOfServices').valueChanges().pipe(
      map(services => {
        const serviceTypes = services.map(svType => svType.Name);
        return Array.from(new Set(serviceTypes));
      })
    ).pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getServiceTypes');
        return throwError(() => new Error(error));
      })
    );
  }



  addService(service: Service):Observable<ServiceWithId | undefined> {
    const id = this.firestore.createId();
    service['id'] = id;
    service.Date_Created = new Date().toISOString();
    service.Date_Updated = new Date().toISOString();
    this.servicesCollection.doc(id).set(Object.assign({},service)).catch(error => {
      this.errorLoggingService.logError(error, 'addService');
      throw error;
    });
    return this.firestore.doc<Service>(`Services/${id}`).valueChanges().pipe(
      map(service => service ? { id, ...service } : undefined)
    );
  }

  updateService(id: string, service: Service):Observable<ServiceWithId | undefined> {
    service.Date_Updated = new Date().toISOString();
    this.servicesCollection.doc(id).update(Object.assign({},service)).catch(error => {
      this.errorLoggingService.logError(error, 'updateService');
      throw error;
    });
    return this.firestore.doc<Service>(`Services/${id}`).valueChanges().pipe(
      map(service => service ? { id, ...service } : undefined)
    );
  }


  deleteService(serviceId: string): Promise<void> {
    return this.servicesCollection.doc(serviceId).delete().catch(error => {
      this.errorLoggingService.logError(error, 'deleteService');
      throw error;
    });
  }
}



