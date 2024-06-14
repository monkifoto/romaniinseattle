import { Component } from '@angular/core';
import { EventsService } from 'src/app/Services/events.service';
import { Event } from 'src/app/Model/event.model';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent {

  events: Event[] = [];

  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data.sort((a, b) => {
        if (a.Approved === b.Approved) {
          return new Date(b.Date_Created).getTime() - new Date(a.Date_Created).getTime();
        }
        return a.Approved ? 1 : -1;
      });
    });
  }

  toggleApproval(evnt: Event): void  {
    evnt.Approved = !evnt.Approved;
    evnt.ApprovedDate = new Date().toISOString()
    this.eventService.updateEvent(evnt.id!, evnt);
  }

}
