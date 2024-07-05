import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ErrorLoggingService } from 'src/app/Services/error-logging.service';
import { ErrorModel } from 'src/app/Model/error-model.model';

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.css']
})
export class ErrorLogComponent implements OnInit {
  errorLogs: ErrorModel[] | undefined;

  constructor(private firestore: AngularFirestore, private errorLoggingService: ErrorLoggingService) {
    //this.errorLogs$ = this.firestore.collection('errorLogs', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  ngOnInit(): void {
    this.errorLoggingService.getErrorLogs().subscribe(data=>{
      this.errorLogs = data;
    })
  }

  convertTimestamp(timestamp: any): Date {
    return timestamp.toDate();
  }

  loadErrorLogs(): void {
    this.errorLoggingService.getErrorLogs().subscribe(data => {
      this.errorLogs = data;
    });
  }

  clearLogs(): void {
    this.errorLoggingService.clearErrorLogs().then(() => {
      this.loadErrorLogs();
    }).catch(error => {
      console.error("Error clearing logs: ", error);
    });
  }
}
