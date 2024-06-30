import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/Services/services.service';
import { Service, ServiceWithId } from 'src/app/Model/service.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ServicesManagementComponent implements OnInit  {

  searchText: string = '';
  services: ServiceWithId[] = [];
  filteredServices: ServiceWithId[] = [];


  constructor(private serviceManagementService: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.serviceManagementService.getAllServices().subscribe(services => {
      this.services = services.sort((a, b) => {
        if (a.Approved === b.Approved) {
          return new Date(b.Date_Created).getTime() - new Date(a.Date_Created).getTime();
        }
        return a.Approved ? 1 : -1;
      });
      this.filteredServices = services.sort((a, b) => {
        if (a.Approved === b.Approved) {
          return new Date(b.Date_Created).getTime() - new Date(a.Date_Created).getTime();
        }
        return a.Approved ? 1 : -1;
      });
    });
    //this.filteredServices = this.services;

  }

  toggleApproval(service: ServiceWithId): void {
    service.Approved = !service.Approved;
    this.serviceManagementService.updateService(service.id, service);
  }

  navigateToEditService(id: string): void {
    this.router.navigate(['/edit-service', id]);
  }


  filterServices() {
    console.log("list of services", this.services.length);
    console.log("list of filtered services", this.filteredServices.length);
    console.log("search text", this.searchText);
    if (!this.searchText) {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(service =>
        service.Name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        service.Service_Type.toLowerCase().includes(this.searchText.toLowerCase()) ||
        service.Phone_Number.includes(this.searchText) ||
        service.Email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        service.Description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

  }

  deleteService(id: string): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceManagementService.deleteService(id);
    }
  }
  // updateDateCreated(): void {
  //   this.serviceManagementService.updateAllEntriesWithCurrentDate();
  // }
}
