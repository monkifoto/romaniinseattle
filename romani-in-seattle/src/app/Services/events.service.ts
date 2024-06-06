import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


interface Event {
  Name: string;
  Approved: boolean;
  Contact: string;
  Event_date: Date;
  Location: string;
  Phone_Number: string;
  Poster_Image:string;
  Price:string;
  Website:string;
  Community_Sponsor: boolean;
  Description: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private firestore: AngularFirestore) { }

  getEvents(): Observable<Event[]> {
    return this.firestore.collection<Event>('Events',ref=>ref.orderBy('Community_Sponsor','desc')).valueChanges();
  }

  addEvent(event: Event): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('Events').doc(id).set(event);
  }
}
