import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedServiceType: string = '';


  constructor(private servicesService: ServicesService,private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedServiceType = params['serviceType'] || '';
    });
    this.filterServices(this.selectedServiceType);
  }

  navigateToAddService(): void {
    this.router.navigate(['/add-service']);
  }
  // navigateToEditService(id: string): void {
  //   this.router.navigate(['/edit-service', id]);
  // }

  handleChange(event:Event): string{
    const {target} = event
    if(target) console.log((target as HTMLInputElement).value);
    return (target as HTMLInputElement).value;
  }

  fetchServiceTypes(): void {
    console.log("FetchServiceTypes Function");
    this.servicesService.getAllServiceTypes().subscribe(types => {
      this.serviceTypes = types;
      types.forEach(element => {
        //console.log("Serviciu: " + element);
      });
    });
      console.log("Number of Service Types returned by the database : " + this.serviceTypes.length);

  }

  // fetchServices(): void {
  //   this.servicesService.getServices().subscribe(data => {
  //     this.services = data;
  //   });
  // }

  onFilterChange(serviceType: string): void {
     console.log('Filter changed:', serviceType);
     //this.fetchServices();
     this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { serviceType: serviceType },
      queryParamsHandling: 'merge' // preserve the existing query params
    });
    this.filterServices(serviceType);
  }

  filterServices(selectedServiceType:string):void{
      console.log("Filter Serices: " + selectedServiceType);


      this.fetchServiceTypes();
   // debugger;
      if (!selectedServiceType|| selectedServiceType ==='') {
      //this.filteredServices = this.services;
      this.servicesService.getServices().subscribe(services => {
        this.services = services;
        this.filteredServices = services;
        // this.extractServiceTypes();
        console.log("Number of Services returned by the Database :  " + this.services.length);
      });
    } else {
      this.servicesService.getServicesByType(selectedServiceType).subscribe(
        fi =>{
          this.services = fi;
          this.filteredServices = fi;
          console.log("Number of Services returned by the Database :  " + this.services.length);
        }
      )
      //this.filteredServices = this.services.filter(service => service.Service_Type === selectedServiceType);
    }

    //debugger;
  // this.servicesService.getServices().subscribe(services => {
  //     this.services = services;
  //     this.filteredServices = services;
  //     //this.extractServiceTypes();
  //   });
  //   //this.fetchServiceTypes();
  //   //this.fetchServices();

  //   if (serviceType === '') {
  //     this.filteredServices = this.services;
  //   } else {
  //     this.filteredServices = this.services.filter(service => service.Service_Type === serviceType);
  //   }
  }

  extractServiceTypes(): void {
    this.serviceTypes = [...new Set(this.services.map(service => service.Service_Type))];
  }

  shareLink(): void {
    const baseUrl = 'https://romaniinseattle.web.app/services';
    const queryParams = this.router.url.split('?')[1] || '';
    const shareUrl = `${baseUrl}${queryParams ? '?' + queryParams : ''}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }
}
