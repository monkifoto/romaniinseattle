import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/Services/services.service';
import { Service, ServiceWithId } from 'src/app/Model/service.model';
import { ServiceType } from 'src/app/Model/service-type.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  // services: Service[] = [];
  services: ServiceWithId[] = [];
  filteredServices: ServiceWithId[] = [];
  serviceTypes: ServiceType[] = [];
  selectedServiceTypeId: string = '';


  constructor(private servicesService: ServicesService,private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedServiceTypeId = params['serviceTypeId'] || '';
    });
    console.log("Selected Type Id in On Init:", this.selectedServiceTypeId);
    this.filterServices(this.selectedServiceTypeId);
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
    this.servicesService.getAllServiceTypes().subscribe(types => {
      this.serviceTypes = types;
      types.forEach(element => {
      });
    });
  }


  onFilterChange(serviceTypeId: string): void {
     console.log('Filter changed:', serviceTypeId);
     this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { serviceTypeId: serviceTypeId },
      queryParamsHandling: 'merge' // preserve the existing query params
    });
    this.filterServices(serviceTypeId);
  }

  filterServices(selectedServiceTypeId:string):void{
      this.fetchServiceTypes();
console.log("Selected Service Type Id in Filter Sercices", selectedServiceTypeId);
      if (!selectedServiceTypeId|| selectedServiceTypeId ==='') {
 console.log("in if");
      this.servicesService.getServices().subscribe(services => {
        this.services = services.filter(ser => ser.Approved);;
        this.filteredServices = services.filter(ser => ser.Approved);
        // this.extractServiceTypes();
        console.log("Number of Services returned by the Database :  " + this.services.length);
      });
    } else {
      console.log("in else");
      this.servicesService.getServicesByTypeID(selectedServiceTypeId).subscribe(
        fi =>{
          console.log("fi count", fi.length);
          this.services = fi.filter(ser => ser.Approved);
          this.filteredServices = fi.filter(ser => ser.Approved);
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

  // extractServiceTypes(): void {
  //   this.serviceTypes = [...new Set(this.services.map(service => service.Service_Type))];
  // }

  shareLink(): void {
    const baseUrl = 'https://romaniinseattle.com/services';
    const queryParams = this.router.url.split('?')[1] || '';
    const shareUrl = `${baseUrl}${queryParams ? '?' + queryParams : ''}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }
}
