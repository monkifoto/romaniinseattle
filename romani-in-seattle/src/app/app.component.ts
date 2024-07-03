import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter } from 'rxjs';
import * as firebase from 'firebase/app';
import { AnalyticsService } from './Services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'romani-in-seattle';

  constructor(
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {

    //this.analyticsService.logEvent('page_view');
  }

  trackButtonClick(): void {
    //this.analyticsService.logEvent('button_click');
  }

  // Example method to get a unique user ID
  // getUniqueUserId(): string {
  //   // You can use Firebase Auth user ID or a custom implementation
  //   return 'unique-user-id';
  // }
}
