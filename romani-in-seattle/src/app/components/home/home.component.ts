import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OffersWithId } from 'src/app/Model/offers.model';
import { EventsService } from 'src/app/Services/events.service';
import { OffersService } from 'src/app/Services/offers.service';
import { Event, EventWithId } from 'src/app/Model/event.model';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { HttpClient } from '@angular/common/http';
interface ResourceLink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  resourceLinks: ResourceLink[] = [
    { name: 'Ambasada Romaniei in SUA', url: 'https://washington.mae.ro/' },
    { name: 'Ambasada SUA in Romania', url: 'https://ro.usembassy.gov/' },
    { name: 'American Romanian Cultural Society', url: 'www.arcsproject.org' },
    { name: 'Biserica Sfintii Trei Ierarhi', url: 'http://www.ortodox.org/'},
    { name: 'Romanian United Foundation', url: 'https://www.romanianunitedfund.org/'}
  ];
  private startTime!: number;
  events: EventWithId[] = [];
  offers: OffersWithId[] = [];

  constructor(private eventService: EventsService, private offersService: OffersService, private router: Router, private analytics: AngularFireAnalytics) { }



  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.analytics.logEvent('page_view', { page_path: event.urlAfterRedirects });
      }
    });

    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
    this.offersService.getOffers().subscribe(offer => {
      this.offers = offer;
    });

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        this.analytics.logEvent('page_load_time', {
          name: entry.name,
          duration: entry.duration
        });
      });
    });

    observer.observe({ type: 'navigation', buffered: true });
  }


  @HostListener('window:beforeunload')
  logDuration() {
    const duration = Date.now() - this.startTime;
    this.analytics.logEvent('visit_duration', { duration: duration });
  }

  getData() {
    const startTime = performance.now();
  }
}


