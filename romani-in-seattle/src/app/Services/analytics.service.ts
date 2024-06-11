import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private firestore: AngularFirestore) { }

  getAnalytics(): Observable<any[]> {
    return this.firestore.collection('analytics').valueChanges();
  }
}
