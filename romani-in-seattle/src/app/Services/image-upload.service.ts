import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { Observable, from, throwError } from 'rxjs';
import { ErrorLoggingService } from './error-logging.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor(private storage: AngularFireStorage,
    private errorLoggingService: ErrorLoggingService
  ) {}

  uploadImage(file: File, path: string): Observable<string> {
    const filePath = `${path}/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    // console.log(filePath);
    // console.log(storageRef);
    // console.log(uploadTask);

    return new Observable<string>((observer) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            observer.next(downloadURL);
            observer.complete();
          });
        })
      ).subscribe();
    });
  }

  // uploadOfferImage(file: File, offerId: string): Observable<string> {
  //   const filePath = `offers/${offerId}/${file.name}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);

  //   return task.snapshotChanges().pipe(
  //     finalize(() => fileRef.getDownloadURL()),
  //     switchMap(() => fileRef.getDownloadURL()),
  //     catchError(error => {
  //       this.errorLoggingService.logError(error, 'uploadImage');
  //       return throwError(() => new Error(error));
  //     })
  //   );
  // }

  uploadOfferImage(file: File, offerId: string): Observable<string> {
    const filePath = `offers/${offerId}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return from(task).pipe(
      switchMap(() => fileRef.getDownloadURL()),
      catchError(error => {
        this.errorLoggingService.logError(error, 'uploadImage');
        throw error;
      })
    );
  }
  deleteOfferImage(imageUrl: string): Observable<void> {
    const ref = this.storage.refFromURL(imageUrl);
    return ref.delete().pipe(
      catchError(error => {
        this.errorLoggingService.logError(error, 'deleteImage');
        return throwError(() => new Error(error));
      })
    );
  }
}
