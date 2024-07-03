import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, catchError, from, map, mergeMap, throwError } from 'rxjs';
import { Event, EventWithId } from '../Model/event.model';
import { ErrorLoggingService } from './error-logging.service';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  constructor(private firestore: AngularFirestore, private errorLoggingService: ErrorLoggingService) { }
  private eventsCollection = this.firestore.collection('Events');


  getEvents(): Observable<EventWithId[]> {
    return this.firestore.collection('Events',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(map(ser => ser.filter(se => se.Approved == true))).pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getEvents');
        return throwError(() => new Error(error));
      })
    );
  }

  getAllEvents(): Observable<EventWithId[]> {
    return this.firestore.collection('Events',ref=>ref.orderBy('Community_Sponsor','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getAllEvents');
        return throwError(() => new Error(error));
      })
    );
  }

  getEventById(id: string): Observable<EventWithId | undefined >  {
    return this.eventsCollection.doc<EventWithId>(id).valueChanges().pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'getGetEventById: ' + id);
        return throwError(() => new Error(error));
      })
    );
  }


  addEvent(event: Event): Promise<void> {
    const id = this.firestore.createId();
    event.Date_Created =  new Date();
    event.Date_Updated =  new Date();
    event.ApprovedDate =  new Date();
    event.Approved =true;
    return this.firestore.collection('Events').doc(id).set(event).catch(error => {
      this.errorLoggingService.logError(error, 'addEvent');
      throw error;
    });
  }

  updateEvent(id: string, evnt: Event):Observable<EventWithId | undefined> {
    evnt.Date_Updated = new Date();
    this.eventsCollection.doc(id).update(evnt).catch(error => {
      this.errorLoggingService.logError(error, 'updateEvent');
      throw error;
    });
    return this.firestore.doc<Event>(`Events/${id}`).valueChanges().pipe(
      map(evnt => evnt ? { id, ...evnt } : undefined)
    );
  }

  deleteService(serviceId: string): Promise<void> {
    return this.eventsCollection.doc(serviceId).delete().catch(error => {
      this.errorLoggingService.logError(error, 'deleteEvent');
      throw error;
    });
  }
}
