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
      Name: ['', Validators.required],
      Email: ['', Validators.email],
      Phone_Number: ['', Validators.required],
      Website: ['', Validators.required],
      Description: ['', Validators.required],
      Service_Type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    this.servicesService.getService(this.serviceId).subscribe(service => {
      this.serviceForm.patchValue({
        Name: service?.Name,
        Email: service?.Email,
        Phone_Number: service?.Phone_Number,
        Service_Type: service?.Service_Type,
        Website: service?.Website,
        Description: service?.Description

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
