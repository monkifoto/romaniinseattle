import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    { name: 'Service 1', person: 'John Doe', phone: '123-456-7890', email: "john@gmail.com", website: "www.johnsservice.com", description : "We ofer the best service in town" },
    { name: 'Service 2', person: 'Jane Smith', phone: '234-567-8901', email: "john@gmail.com", website: "www.johnsservice.com", description : "We ofer the best service in town" },
    { name: 'Service 3', person: 'Jim Brown', phone: '345-678-9012', email: "john@gmail.com", website: "www.johnsservice.com", description : "We ofer the best service in town" },
    { name: 'Service 4', person: 'Jack White', phone: '456-789-0123' , email: "john@gmail.com", website: "www.johnsservice.com", description : "We ofer the best service in town"},
    { name: 'Service 5', person: 'Jill Green', phone: '567-890-1234' , email: "john@gmail.com", website: "www.johnsservice.com", description : "We ofer the best service in town"},
    { name: 'Service 6', person: 'Jerry Blue', phone: '678-901-2345', email: "john@gmail.com", website: "www.johnsservice.com", description : "We ofer the best service in town" },
    { name: 'Service 7', person: 'Jenny Red', phone: '789-012-3456', email: "john@gmail.com", website: "www.johnsservice.com", description : "We ofer the best service in town" },
    { name: 'Service 8', person: 'Jacob Black', phone: '890-123-4567' , email: "john@gmail.com", website: "www.johnsservice.com", description : "We ofer the best service in town"}
  ];
  constructor() { }

  ngOnInit(): void { }
}
