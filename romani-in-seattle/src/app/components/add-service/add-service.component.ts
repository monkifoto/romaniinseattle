import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  serviceForm: FormGroup;
  serviceTypes: string[] = [];

  constructor(private fb: FormBuilder, private servicesService: ServicesService) {
    this.serviceForm = this.fb.group({
      businessName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required],
      serviceType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchServiceTypes();
  }

  fetchServiceTypes(): void {
    this.servicesService.getAllServiceTypes().subscribe(types => {
      this.serviceTypes = types;
    });
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {

      const Service = {
        Name: this.serviceForm.value.businessName,
        Phone_Number: this.serviceForm.value.phone,
        Service_Type: this.serviceForm.value.serviceType,
        Community_Sponsor: false,
        Email: this.serviceForm.value.email,
        Website: this.serviceForm.value.website,
        Description: this.serviceForm.value.description
      };

      this.servicesService.addService(Service).then(() => {
        console.log('Service added successfully');
        this.serviceForm.reset();
      }).catch(error => {
        console.error('Error adding service: ', error);
      });
    }
  }
}
