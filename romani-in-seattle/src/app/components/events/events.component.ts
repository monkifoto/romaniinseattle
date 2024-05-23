import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/Services/events.service';
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
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }
}

