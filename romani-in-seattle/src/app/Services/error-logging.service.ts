import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ErrorLoggingService {
  [x: string]: any;

  private errorLogsCollection = this.firestore.collection('errorLogs');

  constructor(private firestore: AngularFirestore) {}

  logError(error: any, context?: string): void {
    console.log("Error Logger ", error);
    const timestamp = new Date().toISOString();
    const id = this.firestore.createId();
    //this['errorLogEntry'].errorDetail = error;

   // this.errorLogsCollection.add({ error, context, timestamp });
  }
}
