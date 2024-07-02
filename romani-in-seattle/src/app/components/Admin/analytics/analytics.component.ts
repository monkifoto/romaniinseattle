import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsService } from 'src/app/Services/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  analyticsLogs: any[] | undefined;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.analyticsService.getAnalytics().subscribe(
      data => {
        this.analyticsLogs = data;
      },
      error => {
        console.error('Error fetching analytics:', error);
        // Handle error as needed
      }
    );
  }
}
