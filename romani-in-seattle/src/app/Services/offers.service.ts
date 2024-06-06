import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Offers, OffersWithId } from '../Model/offers.model';
import { OfferType } from '../Model/offer-type.model';


@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private firestore: AngularFirestore) { }


  getOffers(): Observable<OffersWithId[]> {
    return this.firestore.collection('Offers').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Offers;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addOffer(offer: Offers): Promise<void> {
    const id = this.firestore.createId();
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    offer.Date_Created = today;
    return this.firestore.collection('Offers').doc(id).set(offer);
  }

  getOffer(id: string): Observable<Offers | undefined> {
    return this.firestore.collection('Offers').doc<Offers>(id).valueChanges();
  }

  updateOffer(id: string, offer: Offers): Promise<void> {
    return this.firestore.collection('Offers').doc(id).update(offer);
  }

  getAllOfferTypes(): Observable<string[]> {
    return this.firestore.collection<OfferType>('OfferTypes').valueChanges().pipe(
      map(services => {
        const offerTypes = services.map(svType => svType.OfferType);
        return Array.from(new Set(offerTypes));
      })
    );
  }

}
