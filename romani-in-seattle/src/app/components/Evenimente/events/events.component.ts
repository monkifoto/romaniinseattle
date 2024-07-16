import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/Services/events.service';
import { Router } from '@angular/router';
import { Event, EventWithId } from 'src/app/Model/event.model';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: EventWithId[] = [];

  constructor(private eventService: EventsService,
     private router: Router,
     private analytics: AngularFireAnalytics
    ) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  navigateToAddEvent(): void {
    this.analytics.logEvent('button_click', { button_name: 'add-event' });
    this.router.navigate(['/add-event']);
  }
}

