import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/Services/services.service';
import { Service, ServiceWithId } from 'src/app/Model/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  // services: Service[] = [];
  services: ServiceWithId[] = [];
  filteredServices: ServiceWithId[] = [];
  serviceTypes: string[] = [];


  constructor(private servicesService: ServicesService, private router: Router) { }



  ngOnInit(): void {
    this.servicesService.getServices().subscribe(services => {
      this.services = services;
      this.filteredServices = services;
      this.extractServiceTypes();
    });
    this.fetchServiceTypes();
    this.fetchServices();
  }

  navigateToAddService(): void {
    this.router.navigate(['/add-service']);
  }
  navigateToEditService(id: string): void {
    console.log("Edit Service ID:" + id);
    this.router.navigate(['/edit-service', id]);
  }

  handleChange(event:Event): string{
    console.log(event);
    const {target} = event
    if(target) console.log((target as HTMLInputElement).value);
    return (target as HTMLInputElement).value;
  }

  fetchServiceTypes(): void {
    this.servicesService.getAllServiceTypes().subscribe(types => {
      this.serviceTypes = types;
      types.forEach(element => {
        console.log("Serviciu: " + element);
      });
    });
  }

  fetchServices(): void {
    this.servicesService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  onFilterChange(serviceType: string): void {
     console.log('Filter changed:', serviceType);
     this.fetchServices();
    if (serviceType === '') {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(service => service.Service_Type === serviceType);
    }
  }

  extractServiceTypes(): void {
    this.serviceTypes = [...new Set(this.services.map(service => service.Service_Type))];
  }

}
