import { Component, Input } from '@angular/core';
import { Event } from 'src/app/Model/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() event!: Event;
}
