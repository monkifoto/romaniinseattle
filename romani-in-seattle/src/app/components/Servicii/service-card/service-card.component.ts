import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Service, ServiceWithId } from 'src/app/Model/service.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  @Input()
  svc!: ServiceWithId;

  constructor(private router: Router) {}

  viewDetails(): void {
    this.router.navigate(['/services', this.svc.id]);
  }


}
