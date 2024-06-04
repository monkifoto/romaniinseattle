// src/app/add-event/add-event.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'src/app/Services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventsService: EventsService) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.eventForm.valid) {
      const newEvent = this.eventForm.value;

      this.eventsService.addEvent(newEvent).then(() => {
        console.log('Event added successfully');
        this.eventForm.reset();
      }).catch(error => {
        console.error('Error adding event: ', error);
      });
    }
  }
}
