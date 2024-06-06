import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Offers, OffersWithId } from '../Model/offers.model';


@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private firestore: AngularFirestore) { }


  getOffers(): Observable<OffersWithId[]> {
    return this.firestore.collection('Jobs').snapshotChanges().pipe(
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
    return this.firestore.collection('Jobs').doc(id).set(offer);
  }

  getOffer(id: string): Observable<Offers | undefined> {
    return this.firestore.collection('Jobs').doc<Offers>(id).valueChanges();
  }

  updateOffer(id: string, offer: Offers): Promise<void> {
    return this.firestore.collection('Jobs').doc(id).update(offer);
  }
}
