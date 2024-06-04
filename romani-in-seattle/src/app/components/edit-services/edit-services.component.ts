import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent implements OnInit {
  serviceForm: FormGroup;
  serviceId: string | null = null;
  serviceTypes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService
  ) {
    this.serviceForm = this.fb.group({
      businessName: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required],
      serviceType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    this.servicesService.getService(this.serviceId).subscribe(service => {
      this.serviceForm.patchValue({
        businessName: service?.Name,
        email: service?.Email,
        phone: service?.Phone_Number,
        serviceType: service?.Service_Type,
        website: service?.Website,
        description: service?.Description

      });
    });

    this.fetchServiceTypes();
  }

  fetchServiceTypes(): void {
    this.servicesService.getAllServiceTypes().subscribe(types => {
      this.serviceTypes = types;
    });
  }


  onSubmit(): void {
    if (this.serviceForm.valid && this.serviceId) {
      this.servicesService.updateService(this.serviceId, this.serviceForm.value).then(() => {
        console.log('Service updated successfully');
        this.router.navigate(['/services']);
      }).catch(error => {
        console.error('Error updating service: ', error);
      });
    }
  }
}
