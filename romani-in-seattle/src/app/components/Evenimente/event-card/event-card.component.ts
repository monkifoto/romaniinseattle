import { Component, Input } from '@angular/core';
import { EventWithId } from 'src/app/Model/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() event!: EventWithId;
  defaultImage = 'https://storage.cloud.google.com/romaniinseattle.appspot.com/events/defaultImage.jpg';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.event.Poster_Image) {
      this.event.Poster_Image = this.defaultImage;
    }
  }

  navigateToDetails(): void {
    console.log('Navigating to details:', this.event.id);
    this.router.navigate(['/events', this.event.id]);
  }
}
