import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service, ServiceExt, ServiceWithId } from 'src/app/Model/service.model';
import { formatUrl } from 'src/app/utils/url.utils';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {
  @Input()
  svc!: ServiceWithId;
  svgInstagramIcon = '../../../assets/images/SVG/instagram-icon.svg';
  isMobile: boolean = false;

  constructor(private router: Router,   private analytics: AngularFireAnalytics) {}

  ngOnInit(): void {
    if(this.svc.Image === undefined || this.svc.Image ==''){
      this.svc.Image ='https://firebasestorage.googleapis.com/v0/b/romaniinseattle.appspot.com/o/serviceImages%2FdafaultImage.jpg?alt=media&token=3b0787df-12f0-444a-a426-013843534f1e';
    }
    this.svc.Website = formatUrl(this.svc.Website);
  }

  viewDetails(): void {
    this.analytics.logEvent('button_click', { button_name: 'service-details' });
    this.router.navigate(['/services', this.svc.id]);
  }

  sendEmail(email: string): void {
    this.analytics.logEvent('button_click', { button_name: 'service-email' });
    window.location.href = `mailto:${email}`;
  }


}
