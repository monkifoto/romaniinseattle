import { Component } from '@angular/core';
import { EventsService } from 'src/app/Services/events.service';
import { Event, EventWithId } from 'src/app/Model/event.model';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent {

  events: EventWithId[] = [];

  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data.sort((a, b) => {
        if (a.Approved === b.Approved) {
          return new Date(b.Date_Created).getTime() - new Date(a.Date_Created).getTime();
        }
        return a.Approved ? 1 : -1;
      });
    });
  }

  toggleApproval(evnt: EventWithId): void  {
    evnt.Approved = !evnt.Approved;
    evnt.ApprovedDate = new Date().toISOString()
    this.eventService.updateEvent(evnt.id, evnt);
  }

  deleteService(id: string): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.eventService.deleteService(id);
    }
  }

}
