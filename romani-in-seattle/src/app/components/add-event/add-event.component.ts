// src/app/add-event/add-event.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'src/app/Services/events.service';
import { Event } from 'src/app/Model/event.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventsService: EventsService) {
    this.eventForm = this.fb.group({
      Approved: [''],
      Community_Sponsor: [''],
      Contact: [''],
      Description: ['', Validators.required],
      Event_date: ['', Validators.required],
      Location: ['', Validators.required],
      Name: ['', Validators.required],
      Phone_Number: [''],
      Poster_Image: ['', Validators.required],
      Price: ['', Validators.required],
      Website: [''],
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
