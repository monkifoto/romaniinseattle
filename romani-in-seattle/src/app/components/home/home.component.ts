import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffersWithId } from 'src/app/Model/offers.model';
import { EventsService } from 'src/app/Services/events.service';
import { OffersService } from 'src/app/Services/offers.service';
// import { Event } from 'src/app/Model/event.model';
interface ResourceLink {
  name: string;
  url: string;
}

interface Event {
  Name: string;
  Approved: boolean;
  Contact: string;
  Event_date: Date;
  Location: string;
  Phone_Number: string;
  Poster_Image:string;
  Price:string;
  Website:string;
  Community_Sponsor: boolean;
  Description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  resourceLinks: ResourceLink[] = [
    { name: 'Ambasada Romaniei in SUA', url: 'https://washington.mae.ro/' },
    { name: 'American Romanian Cultural Society', url: 'www.arcsproject.org' },
    { name: 'Biserica Sfintii Trei Ierarhi', url: 'http://www.ortodox.org/'}
  ];

  events: Event[] = [];
  offers: OffersWithId[] = [];

  constructor(private eventService: EventsService, private offersService: OffersService, private router: Router) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
    this.offersService.getOffers().subscribe(offer => {
      this.offers = offer;
    });
  }

  navigateToAddEvent(): void {
    this.router.navigate(['/add-event']);
  }
}


