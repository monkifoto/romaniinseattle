import { Component, Input } from '@angular/core';
import { EventWithId } from 'src/app/Model/event.model';
import { Router } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() event!: EventWithId;
  defaultImage = 'https://storage.cloud.google.com/romaniinseattle.appspot.com/events/defaultImage.jpg';

  constructor(private router: Router,
    private analytics: AngularFireAnalytics
  ) {}

  ngOnInit(): void {
    if (!this.event.Poster_Image) {
      this.event.Poster_Image = this.defaultImage;
    }
  }

  navigateToDetails(): void {
    this.analytics.logEvent('button_click', { button_name: 'back-to-events' });
    this.router.navigate(['/events', this.event.id]);
  }
}
