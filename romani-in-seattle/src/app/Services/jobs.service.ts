import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Job {
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
export class JobsService {

  constructor(private firestore: AngularFirestore) { }

  getEvents(): Observable<Job[]> {
    return this.firestore.collection<Job>('Jobs').valueChanges();
  }

  addJob(job: Job): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('Jobs').doc(id).set(job);
  }
}
