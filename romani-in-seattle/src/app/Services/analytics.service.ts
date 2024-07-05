import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, combineLatest, combineLatestWith, filter, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(    private firestore: AngularFirestore,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.trackPageViews();
     }
  private analyticsCollection = this.firestore.collection('analytics');

  getAnalytics(): Observable<any[]> {
    return this.firestore.collection('analytics', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  private trackPageViews() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.queryParams),
      mergeMap(queryParams => this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => {
          const navigationEvent = event as NavigationEnd;
          return { navigationEvent, queryParams };
        })
      ))
    ).subscribe(({ navigationEvent, queryParams }) => {
      this.logAnalyticsData(navigationEvent.urlAfterRedirects, queryParams, navigationEvent.type);
    });
  }

  private async logAnalyticsData(pagePath: string, queryParams: any, event_type:any) {
    //const user = await this.afAuth.currentUser;
    const userAgent = navigator.userAgent;
    const timestamp = new Date();
    const browser = this.getBrowserType(userAgent);
    const isMobile = /mobile/i.test(userAgent);

    const analyticsData = {
      pagePath,
      queryParams,
      timestamp,
      browser,
      isMobile,
      event_type

    };

    return this.firestore.collection('analytics').add(analyticsData);
  }

  private getBrowserType(userAgent: string): string {
    if (userAgent.includes('Firefox')) {
      return 'Firefox';
    } else if (userAgent.includes('Chrome')) {
      return 'Chrome';
    } else if (userAgent.includes('Safari')) {
      return 'Safari';
    } else if (userAgent.includes('Edge')) {
      return 'Edge';
    } else {
      return 'Unknown';
    }
  }

  private getIPAddress() {
    return this.http.get<{ ip: string }>('https://api.ipify.org/?format=json').pipe(
      catchError(error => {
        console.error('Error getting IP address: ', error);
        return of({ ip: 'Unknown' });
      })
    );
  }
}
