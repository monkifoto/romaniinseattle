import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { Offers, OffersWithId } from '../Model/offers.model';
import { OfferType } from '../Model/offer-type.model';
import { ErrorLoggingService } from './error-logging.service';
import { ImageUploadService } from './image-upload.service';


@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private firestore: AngularFirestore,
     private errorLoggingService: ErrorLoggingService,
     private imageService: ImageUploadService)
     { }

  private offerCollection = this.firestore.collection('Offers');

  generateOfferId(): string {
    return this.firestore.createId();
  }

  getAllOffers(): Observable<OffersWithId[]> {
    return this.firestore.collection('Offers',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Offers;
        const id = a.payload.doc.id;
        return {id, ...data };
      }))
    ).pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getAllOffers');
        return throwError(() => new Error(error));
      })
    );
  }

  getOffers(): Observable<OffersWithId[]> {
    return this.firestore.collection('Offers',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Offers;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(map(ser => ser.filter(se => se.Approved == true))).pipe(map(ser => ser.filter(se => se.Approved == true))).pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getApprovedOffers');
        return throwError(() => new Error(error));
      })
    );
  }

  getOfferById(id: string): Observable<OffersWithId > {
    return this.firestore.collection<Offers>('Offers').doc(id).valueChanges().pipe(
      map(offer => {
        if (!offer) {
          throw new Error(`Offer with ID ${id} not found`);
        }
        return { id, ...offer } as OffersWithId;
      }),
      catchError(error => {
        this.errorLoggingService.logError(error, 'getOfferById: ' + id);
        return throwError(() => new Error(error));
      })
    );
  }

  getAllOfferTypes(): Observable<string[]> {
    return this.firestore.collection<OfferType>('OfferTypes').valueChanges().pipe(
      map(services => {
        const offerTypes = services.map(svType => svType.OfferType);
        return Array.from(new Set(offerTypes));
      })
    ).pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getOfferTypes');
        return throwError(() => new Error(error));
      })
    );
  }


  addOffer(offer: Offers): Observable<OffersWithId|undefined> {
    console.log(offer);
    const id = this.firestore.createId();
    offer['id']= id;
    offer.Date_Created =  new Date().toISOString();;
    offer.Date_Updated =  new Date().toISOString();;
    this.offerCollection.doc(id).set(Object.assign({},offer)).catch(error => {
      this.errorLoggingService.logError(error, 'addOffer');
      throw error;
    });
    return this.firestore.doc<Offers>(`Offers/${id}`).valueChanges().pipe(
      map(service => service ? { id, ...service } : undefined)
    );
  }

  addOfferWithId(offer: OffersWithId, id: string): Observable<OffersWithId> {
    offer.id = id;
    offer.Date_Created = new Date().toISOString();
    offer.Date_Updated = new Date().toISOString();

    // Convert the set promise to an observable
    return from(this.offerCollection.doc(id).set(Object.assign({}, offer))).pipe(
      switchMap(() => this.firestore.doc<OffersWithId>(`Offers/${id}`).valueChanges().pipe(
        map(storedOffer => {
          if (!storedOffer) {
            throw new Error(`Offer with ID ${id} not found`);
          }
          return { ...storedOffer, id } as OffersWithId;
        }),
        catchError(error => {
          this.errorLoggingService.logError(error, 'addOffer');
          return throwError(() => new Error(error));
        })
      ))
    );
  }

  updateOffer(id: string, offer: Offers): Observable<OffersWithId | undefined> {
    console.log("Update Offer: " + id);
    offer.Date_Updated = new Date().toISOString();
    this.offerCollection.doc(id).update(offer).catch(error => {
      this.errorLoggingService.logError(error, 'updateOffer');
      throw error;
    });
    return this.firestore.doc<Offers>(`Offers/${id}`).valueChanges().pipe(
      map(service => service ? { id, ...service } : undefined)
    );
  }



  deleteOffer(offerId: string): Promise<void> {
    return this.offerCollection.doc(offerId).delete().catch(error => {
      this.errorLoggingService.logError(error, 'deleteOffer');
      throw error;
    });
  }

}
