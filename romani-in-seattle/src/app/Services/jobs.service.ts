import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Job, JobWithId } from '../Model/job.model';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private firestore: AngularFirestore) { }


  getJobs(): Observable<JobWithId[]> {
    return this.firestore.collection('Jobs').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Job;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addJob(job: Job): Promise<void> {
    const id = this.firestore.createId();
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    job.Date_Created = today;
    return this.firestore.collection('Jobs').doc(id).set(job);
  }

  getJob(id: string): Observable<Job | undefined> {
    return this.firestore.collection('Jobs').doc<Job>(id).valueChanges();
  }

  updateJob(id: string, job: Job): Promise<void> {
    return this.firestore.collection('Jobs').doc(id).update(job);
  }
}
