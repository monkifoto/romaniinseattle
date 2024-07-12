import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/Services/events.service';
import { EventWithId } from 'src/app/Model/event.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: EventWithId | undefined;
  defaultImage = 'https://storage.cloud.google.com/romaniinseattle.appspot.com/events/defaultImage.jpg';
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventsService.getEventById(id).subscribe((event: EventWithId | undefined) => {
        this.event = event;
        if (!this.event?.Poster_Image) {
          this.event!.Poster_Image = this.defaultImage;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }
}
