import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/Services/services.service';


interface Service {
  Name: string;
  Service_Type: string;
  Phone_Number: string;
  Email:string;
  Description:string;
  Website:string;
  Community_Sponsor: boolean;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  serviceTypes: string[] = [];
  selectedServiceType: string = '';


  constructor(private servicesService: ServicesService, private router: Router) { }

  navigateToAddService(): void {
    this.router.navigate(['/add-service']);
  }

  handleChange(event:Event): string{
    console.log(event);
    const {target} = event
    if(target) console.log((target as HTMLInputElement).value);
    return (target as HTMLInputElement).value;
  }

  ngOnInit(): void {
    // this.servicesService.getServices().subscribe(data => {
    //   this.services = data;
    // });
    this.fetchServiceTypes();
    this.fetchServices();
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
    this.selectedServiceType = serviceType;
    console.log(this.selectedServiceType);
    if (serviceType) {
      this.servicesService.getServicesByType(serviceType).subscribe(data => {
        this.services = data;
      });
    } else {
      this.fetchServices();
    }
  }

}
