import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service, ServiceWithId } from 'src/app/Model/service.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {
  @Input()
  svc!: ServiceWithId;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(this.svc.Image === undefined || this.svc.Image ==''){
      this.svc.Image ='https://firebasestorage.googleapis.com/v0/b/romaniinseattle.appspot.com/o/serviceImages%2FdafaultImage.jpg?alt=media&token=3b0787df-12f0-444a-a426-013843534f1e';
    }
  }

  viewDetails(): void {
    this.router.navigate(['/services', this.svc.id]);
  }


}
