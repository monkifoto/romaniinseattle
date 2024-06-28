import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/Services/services.service';
import { Service, ServiceWithId } from 'src/app/Model/service.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ServicesManagementComponent implements OnInit  {


  services: ServiceWithId[] = [];

  constructor(private serviceManagementService: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.serviceManagementService.getAllServices().subscribe(services => {
      this.services = services.sort((a, b) => {
        if (a.Approved === b.Approved) {
          return new Date(b.Date_Created).getTime() - new Date(a.Date_Created).getTime();
        }
        return a.Approved ? 1 : -1;
      });
    });
  }

  toggleApproval(service: ServiceWithId): void {
    service.Approved = !service.Approved;
    this.serviceManagementService.updateService(service.id, service);
  }
  navigateToEditService(id: string): void {
    this.router.navigate(['/edit-service', id]);
  }
  // updateDateCreated(): void {
  //   this.serviceManagementService.updateAllEntriesWithCurrentDate();
  // }
}
