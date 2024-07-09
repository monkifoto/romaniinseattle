import { Component } from '@angular/core';
import { EventsService } from 'src/app/Services/events.service';
import { Event, EventWithId } from 'src/app/Model/event.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent {

  events: EventWithId[] = [];

  constructor(private eventService: EventsService,private router: Router) {}

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
    evnt.ApprovedDate = new Date()
    this.eventService.updateEvent(evnt.id, evnt);
  }

  deleteEvent(id: string): void {
    if (confirm('Are you sure you want to delete this Event?')) {
      this.eventService.deleteEvent(id);
    }
  }

  navigateToEditEvent(id: string): void {
    this.router.navigate(['/edit-event', id]);
  }

}
