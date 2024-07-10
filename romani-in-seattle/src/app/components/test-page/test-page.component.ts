import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service, ServiceExt, ServiceWithId } from 'src/app/Model/service.model';
import { formatUrl } from 'src/app/utils/url.utils';
@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent {

  @Input()
  svc!: ServiceWithId;
  svgInstagramIcon = '../../../assets/images/SVG/instagram-icon.svg';
  isMobile: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });

    if(this.svc.Image === undefined || this.svc.Image ==''){
      this.svc.Image ='https://firebasestorage.googleapis.com/v0/b/romaniinseattle.appspot.com/o/serviceImages%2FdafaultImage.jpg?alt=media&token=3b0787df-12f0-444a-a426-013843534f1e';
    }
    this.svc.Website = formatUrl(this.svc.Website);
  }

  viewDetails(): void {
    this.router.navigate(['/services', this.svc.id]);
  }

  sendEmail(email: string): void {
    window.location.href = `mailto:${email}`;
  }

}
