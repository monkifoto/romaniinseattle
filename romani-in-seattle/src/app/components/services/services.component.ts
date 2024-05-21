import { Component,OnInit } from '@angular/core';
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


  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.servicesService.getServices().subscribe(data => {
      this.services = data;
    });
  }
}
