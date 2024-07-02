import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Offers, OffersWithId } from '../Model/offers.model';
import { OfferType } from '../Model/offer-type.model';
import { ErrorLoggingService } from './error-logging.service';


@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private firestore: AngularFirestore, private errorLoggingService: ErrorLoggingService) { }
  private offerCollection = this.firestore.collection('Offers');

  getAllOffers(): Observable<OffersWithId[]> {
    return this.firestore.collection('Offers',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Offers;
        const id = a.payload.doc.id;
        return {id, ...data };
      }))
    ).pipe(map(ser => ser.filter(se => se.Approved == true))).pipe(
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


  getOfferById(id: string): Observable<Offers | undefined> {
    return this.firestore.collection<Offers>('Offers').doc(id).valueChanges().pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getGetOffersById: ' + id);
        return throwError(() => new Error(error));
      })
    );
  }

  addOffer(offer: Offers): Observable<OffersWithId|undefined> {
    const id = this.firestore.createId();
    offer['id']= id;
   // const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    offer.Date_Created =  new Date().toISOString();;
    offer.Date_Updated =  new Date().toISOString();;
    this.offerCollection.doc(id).set(offer).catch(error => {
      this.errorLoggingService.logError(error, 'addOffer');
      throw error;
    });
    return this.firestore.doc<Offers>(`Offers/${id}`).valueChanges().pipe(
      map(service => service ? { id, ...service } : undefined)
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

  deleteOffer(offerId: string): Promise<void> {
    return this.offerCollection.doc(offerId).delete().catch(error => {
      this.errorLoggingService.logError(error, 'deleteOffer');
      throw error;
    });
  }

}
