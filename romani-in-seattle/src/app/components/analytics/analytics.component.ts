import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/Services/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  analyticsData: any[] = [];

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.analyticsService.getAnalytics().subscribe(data => {
      this.analyticsData = data;
    });
  }
}
