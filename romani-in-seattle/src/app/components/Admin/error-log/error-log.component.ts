import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.css']
})
export class ErrorLogComponent implements OnInit {
  errorLogs$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.errorLogs$ = this.firestore.collection('errorLogs', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  ngOnInit(): void {}
}
