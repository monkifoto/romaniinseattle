import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Event } from '../Model/event.model';


// interface Event {
//   Name: string;
//   Approved: boolean;
//   Expired:boolean;
//   Contact: string;
//   Event_date: Date;
//   Location: string;
//   Phone_Number: string;
//   Poster_Image:string;
//   Price:string;
//   Website:string;
//   Community_Sponsor: boolean;
//   Description: string;
// }

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private firestore: AngularFirestore) { }
  private eventsCollection!: AngularFirestoreCollection<Event>;

  getEvents(): Observable<Event[]> {
    return this.firestore.collection<Event>('Events',ref=>ref.orderBy('Community_Sponsor','desc')).valueChanges();
  }

  addEvent(event: Event): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('Events').doc(id).set(event);
  }

  updateEvent(id: string, data: Partial<Event>): Promise<void> {
    return this.eventsCollection.doc(id).update(data);
  }
}
