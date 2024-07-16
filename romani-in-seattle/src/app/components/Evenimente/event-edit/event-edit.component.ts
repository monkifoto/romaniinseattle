import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'src/app/Services/events.service';
import { EventWithId } from 'src/app/Model/event.model';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  eventForm: FormGroup;
  eventId: string | null = null;
  event: EventWithId | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private eventsService: EventsService,
    private analytics: AngularFireAnalytics
  ) {
    this.eventForm = this.fb.group({
      Approved: [false],
      Community_Sponsor: [false],
      Contact: [''],
      Description: ['', Validators.required],
      Event_Date: ['', Validators.required],
      Location: ['', Validators.required],
      Name: ['', Validators.required],
      Phone_Number: [''],
      Poster_Image: ['', Validators.required],
      Price: ['', Validators.required],
      Website: [''],
      Facebook: [''],
      Instagram: ['']
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.eventsService.getEventById(this.eventId).subscribe((event: EventWithId | undefined) => {
        if (event) {
          this.event = event;
          this.eventForm.patchValue(event);
        }
      });
    }
  }

  onSubmit(): void {
    this.analytics.logEvent('button_click', { button_name: 'save-event' });
    if (this.eventForm.valid && this.eventId) {
      const updatedEvent = this.eventForm.value;
      this.eventsService.updateEvent(this.eventId, updatedEvent).subscribe(() => {
        console.log('Event updated successfully');
        this.router.navigate(['/events', this.eventId]);
      }, error => {
        console.error('Error updating event: ', error);
      });
    }
  }

  goBack(): void {
    this.analytics.logEvent('button_click', { button_name: 'back-to-events' });
    if (this.eventId) {
      this.router.navigate(['/events', this.eventId]);
    } else {
      this.router.navigate(['/events']);
    }
  }
}
