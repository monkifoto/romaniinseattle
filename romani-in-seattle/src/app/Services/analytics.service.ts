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
      this.logAnalyticsData(navigationEvent.urlAfterRedirects, queryParams);
    });
  }

  private async logAnalyticsData(pagePath: string, queryParams: any) {
    //const user = await this.afAuth.currentUser;
    const timestamp = new Date();
    let metrics = this.getMetrics();
    const analyticsData = {
      pagePath,
      queryParams,
      timestamp,
      metrics,


    };

    return this.firestore.collection('analytics').add(analyticsData);
  }

  // logEvent(eventType: string): void {

  //   // this.router.events.pipe(
  //   //   filter(event => event instanceof NavigationEnd)
  //   // ).subscribe((event: NavigationEnd|any) => {
  //   //   const pagePath = event.urlAfterRedirects;
  //   //   const queryParams = this.activatedRoute.snapshot.queryParams;
  //   //   const timestamp = new Date().toISOString;

  //   //   this.firestore.collection('analytics').add({
  //   //     page_path: pagePath,
  //   //     query_params: queryParams,
  //   //     timestamp: timestamp
  //   //   }).then(() => {
  //   //     console.log('Analytics data saved');
  //   //   }).catch(error => {
  //   //     console.error('Error saving analytics data', error);
  //   //   });
  //   // });


  //   console.log('Log Event called', eventType);
  //   console.log("Log Event :", eventType);
  //   this.getIPAddress().subscribe(ipData => {
  //     const metrics = this.getMetrics();
  //     metrics.ipAddress = ipData.ip;
  //     metrics.queryParams = this.getQueryParams();
  //     metrics.pagePath = this.location.path();

  //     this.analyticsCollection.add({ eventType, ...metrics, timestamp: new Date() }).catch(error => {
  //       console.error('Error logging event: ', error);
  //     });
  //   });
  // }


  // private getQueryParams(): string  {
  //    let queryParameterss: any = {};
  //   // this.route.queryParams.subscribe(params => {
  //   //   queryParams = { ...params };
  //   // });
  //   // return queryParams;
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd),
  //     combineLatestWith(this.activatedRoute.queryParams)
  //   ).subscribe(([navigationEnd, queryParams]) => {
  //     const navigationEvent = navigationEnd as NavigationEnd;
  //    //return ( navigationEvent.urlAfterRedirects, queryParams);
  //    queryParameterss = queryParams;
  //   });
  //   return queryParameterss;
  // }

  private getMetrics() {
    const userAgent = navigator.userAgent;
    const isMobile = /mobile/i.test(userAgent);
    const browser = this.getBrowserType(userAgent);
    const ipAddress = this.getIPAddress();

    return {
      userAgent,
      isMobile,
      browser,
      ipAddress: '',
      queryParams: {},
      pagePath: ''
    };
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
