import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ErrorModel } from '../Model/error-model.model';
import { Timestamp } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ErrorLoggingService {
  [x: string]: any;
  err : ErrorModel = new ErrorModel();

  constructor(private firestore: AngularFirestore) {}
  private errorLogsCollection = this.firestore.collection('errorLogs');

  logError(error: any, context?: string) {
    const errorData = {
      message: error.message || error.toString(),
      stack: error.stack || '',
      timestamp: Timestamp.now(),
      context: context? context : '',
      // Add more fields as needed
    };

    // Ensure that errorData is a plain object
    return this.firestore.collection('errorLogs').add(Object.assign({}, errorData));
  }

  getErrorLogs() {
   // return this.firestore.collection('errorLogs', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
    return this.firestore.collection<ErrorModel>('errorLogs', ref => ref.orderBy('timestamp', 'desc').limit(200)).valueChanges();
  }


  async clearErrorLogs(): Promise<void> {
    const snapshot = await this.firestore.collection('errorLogs').get().toPromise();
    if (snapshot && !snapshot.empty) {
      const batch = this.firestore.firestore.batch();
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    } else {
      console.warn('No error logs to clear.');
    }
  }

  // logError(error: any, context?: string): void {
  //   this.err.errorMessage = error;
  //   this.err.errorContext = context? context:'';
  //   this.err.errorDate = new Date();
  //   this.err.id = this.firestore.createId();
  //   // console.log("Error Logger ", error);
  //   // const timestamp = new Date().toISOString();
  //   // const id = this.firestore.createId();
  //   // this['errorLogEntry'].errorDetail = error;

  //   // this.errorLogsCollection.add({ error, context, timestamp });

  //   this.errorLogsCollection.doc(this.err.id).update(this.err);
  // }
}
