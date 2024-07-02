import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(    private firestore: AngularFirestore,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location) { }
  private analyticsCollection = this.firestore.collection('analytics');

  getAnalytics(): Observable<any[]> {
    return this.firestore.collection('analytics', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  logEvent(eventType: string): void {
    console.log("Log Event :", eventType);
    this.getIPAddress().subscribe(ipData => {
      const metrics = this.getMetrics();
      metrics.ipAddress = ipData.ip;
      metrics.queryParams = this.getQueryParams();
      metrics.pagePath = this.location.path();

      this.analyticsCollection.add({ eventType, ...metrics, timestamp: new Date() }).catch(error => {
        console.error('Error logging event: ', error);
      });
    });
  }


  private getQueryParams() {
    let queryParams: any = {};
    this.route.queryParams.subscribe(params => {
      queryParams = { ...params };
    });
    return queryParams;
  }

  private getMetrics() {
    const userAgent = navigator.userAgent;
    const isMobile = /mobile/i.test(userAgent);
    const browser = this.getBrowserType(userAgent);

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
