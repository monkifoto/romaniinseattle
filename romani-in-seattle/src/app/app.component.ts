import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter } from 'rxjs';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'romani-in-seattle';

  constructor(
    private router: Router,
    private analytics: AngularFireAnalytics,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd|any) => {
      const pagePath = event.urlAfterRedirects;
      const queryParams = this.activatedRoute.snapshot.queryParams;
      const timestamp = new Date();

      this.firestore.collection('analytics').add({
        page_path: pagePath,
        query_params: queryParams,
        timestamp: timestamp
      }).then(() => {
        console.log('Analytics data saved');
      }).catch(error => {
        console.error('Error saving analytics data', error);
      });
    });
  }

  // Example method to get a unique user ID
  // getUniqueUserId(): string {
  //   // You can use Firebase Auth user ID or a custom implementation
  //   return 'unique-user-id';
  // }
}
