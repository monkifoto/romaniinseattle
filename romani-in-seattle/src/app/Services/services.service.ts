import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, combineLatest, firstValueFrom, from, map, mergeMap, of, switchMap, throwError } from 'rxjs';
import { Service, ServiceWithId } from '../Model/service.model';
import { ServiceType } from '../Model/service-type.model';
import { ErrorLoggingService } from './error-logging.service';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore, private errorLoggingService: ErrorLoggingService) { }
  private servicesCollection = this.firestore.collection('Services');


  //----------------------------- SERVICES-----------------------------//

   // Fetch approved services and replace the Service_Type_ID with the corresponding service type name
   getServices(): Observable<ServiceWithId[]> {
    return combineLatest([
      this.firestore.collection<ServiceWithId>('Services', ref => ref.orderBy('Community_Sponsor', 'desc')).snapshotChanges(),
      this.getAllServiceTypes()
    ]).pipe(
      map(([serviceActions, serviceTypes]) => {
        const serviceTypeMap = serviceTypes.reduce((acc, serviceType) => {
          acc[serviceType.id] = serviceType.Name;
          return acc;
        }, {} as { [key: string]: string });

        return serviceActions.map(a => {
          const data = a.payload.doc.data() as Service;
          const id = a.payload.doc.id;
          return {
            ...data,
            id,
            Service_Type: serviceTypeMap[data.Service_Type_ID] || 'Unknown'
          };
        }).filter(service => service.Approved);
      }),
      catchError(error => {
        this.errorLoggingService.logError(error, 'getServices');
        return throwError(() => new Error(error));
      })
    );
  }


 // Fetch all services and replace the Service_Type_ID with the corresponding service type name
 getAllServices(): Observable<ServiceWithId[]> {
  return combineLatest([
    this.firestore.collection<ServiceWithId>('Services', ref => ref.orderBy('Community_Sponsor', 'desc')).snapshotChanges(),
    this.getAllServiceTypes()
  ]).pipe(
    map(([serviceActions, serviceTypes]) => {
      const serviceTypeMap = serviceTypes.reduce((acc, serviceType) => {
        acc[serviceType.id] = serviceType.Name;
        return acc;
      }, {} as { [key: string]: string });

      return serviceActions.map(a => {
        const data = a.payload.doc.data() as Service;
        const id = a.payload.doc.id;
        return {
          ...data,
          id,
          Service_Type: serviceTypeMap[data.Service_Type_ID] || 'Unknown'
        };
      });
    }),
    catchError(error => {
      this.errorLoggingService.logError(error, 'getAllServices');
      return throwError(() => new Error(error));
    })
  );
}

  getServiceById(id: string): Observable<ServiceWithId | undefined> {
    return this.servicesCollection.doc<ServiceWithId>(id).valueChanges().pipe(
      switchMap(service => {
        if (service) {
          return this.getServiceTypeById(service.Service_Type_ID).pipe(
            map(serviceType => ({
              ...service,
              Service_Type: serviceType?.Name || 'Unknown'
            }))
          );
        } else {
          return of(undefined);
        }
      }),
      catchError(error => {
        this.errorLoggingService.logError(error, 'getServiceById: ' + id);
        return throwError(() => new Error(error));
      })
    );
  }



  getServicesByTypeID(serviceTypeId: string): Observable<ServiceWithId[]> {
    console.log("getServicesByTypeID", serviceTypeId)
    return this.firestore.collection<ServiceWithId>('Services', ref => ref.where('Service_Type_ID', '==', serviceTypeId).orderBy('Community_Sponsor', 'desc')).valueChanges().pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getServiceByServiceType: ' + serviceTypeId);
        return throwError(() => new Error(error));
      })
    );
  }



  addService(service: Service): Observable<ServiceWithId | undefined> {
    const id = this.firestore.createId();
    service['id'] = id;
    service.Date_Created = new Date().toISOString();
    service.Date_Updated = new Date().toISOString();
    this.servicesCollection.doc(id).set(Object.assign({}, service)).catch(error => {
      this.errorLoggingService.logError(error, 'addService');
      throw error;
    });

    return this.firestore.doc<Service>(`Services/${id}`).valueChanges().pipe(
      switchMap(service => {
        if (service) {
          return this.getServiceTypeById(service.Service_Type_ID).pipe(
            map(serviceType => ({
              ...service,
              id,
              Service_Type: serviceType?.Name || 'Unknown'
            }))
          );
        } else {
          return of(undefined);
        }
      }),
      catchError(error => {
        this.errorLoggingService.logError(error, 'addService');
        return throwError(() => new Error(error));
      })
    );
  }

  updateService(id: string, service: Service): Observable<ServiceWithId | undefined> {
    service.Date_Updated = new Date().toISOString();
    this.servicesCollection.doc(id).update(Object.assign({}, service)).catch(error => {
      this.errorLoggingService.logError(error, 'updateService');
      throw error;
    });

    return this.firestore.doc<Service>(`Services/${id}`).valueChanges().pipe(
      switchMap(service => {
        if (service) {
          return this.getServiceTypeById(service.Service_Type_ID).pipe(
            map(serviceType => ({
              ...service,
              id,
              Service_Type: serviceType?.Name || 'Unknown'
            }))
          );
        } else {
          return of(undefined);
        }
      }),
      catchError(error => {
        this.errorLoggingService.logError(error, 'updateService');
        return throwError(() => new Error(error));
      })
    );
  }

  deleteService(serviceId: string): Promise<void> {
    return this.servicesCollection.doc(serviceId).delete().catch(error => {
      this.errorLoggingService.logError(error, 'deleteService');
      throw error;
    });
  }


  //----------------------------- SERVICE TYPES-----------------------------//


  // Fetch service type by ID from 'ListOfServices' collection
  getServiceTypeById(serviceTypeId: string): Observable<ServiceType | undefined> {
    return this.firestore.collection<ServiceType>('ListOfServices').doc(serviceTypeId).valueChanges().pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getServiceTypeById: ' + serviceTypeId);
        return throwError(() => new Error(error));
      })
    );
  }

   // Fetch all service types from 'ListOfServices' collection
  getAllServiceTypes(): Observable<ServiceType[]> {
    return this.firestore.collection<ServiceType>('ListOfServices').valueChanges().pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getServiceTypes');
        return throwError(() => new Error(error));
      })
    );
  }
//--------------------ONE TIME USE----------------------/
// async updateServiceTypeIds(): Promise<void> {
//   try {
//     // Fetch ListOfServices collection
//     const listOfServicesSnapshot = await firstValueFrom(this.firestore.collection('ListOfServices').get());
//     console.log('ListOfServices:', listOfServicesSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));

//     // Fetch Services collection
//     const servicesSnapshot = await firstValueFrom(this.firestore.collection('Services').get());
//     console.log('Services:', servicesSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));

//     // Map ListOfServices to the ServiceType model
//     const listOfServices = listOfServicesSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data() as { Name: string }
//     }));

//     const batch = this.firestore.firestore.batch();
//     let updates = 0;

//     servicesSnapshot.forEach(serviceDoc => {
//       const serviceData = serviceDoc.data() as Service; // Cast to Service type
//       console.log(`Processing Service ID: ${serviceDoc.id}`, serviceData);

//       let matchingService;
//       for (const serviceType of listOfServices) {
//         console.log(`Comparing Service Type from Services: "${serviceData.Service_Type}" with ListOfServices: "${serviceType.Name}"`);
//         if (serviceType.Name.trim().toLowerCase() === serviceData.Service_Type.trim().toLowerCase()) {
//           matchingService = serviceType;
//           break;
//         }
//       }

//       if (matchingService) {
//         const serviceRef = this.firestore.collection('Services').doc(serviceDoc.id).ref;
//         batch.update(serviceRef, { Service_Type_ID: matchingService.id });
//         updates++;
//         console.log(`Updating Service ID: ${serviceDoc.id} with Service_Type_ID: ${matchingService.id}`);
//       } else {
//         console.warn(`No matching Service_Type found for Service ID: ${serviceDoc.id}`);
//       }
//     });

//     if (updates > 0) {
//       await batch.commit();
//       console.log('Service_Type_IDs added to Services documents.');
//     } else {
//       console.log('No updates were necessary.');
//     }
//   } catch (error) {
//     console.error('Error updating Service_Type_IDs in Services documents:', error);
//   }
// }
}



