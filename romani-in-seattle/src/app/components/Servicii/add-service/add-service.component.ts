import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/Services/services.service';
import { ImageUploadService } from 'src/app/Services/image-upload.service';
import { Router } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { ServiceType } from 'src/app/Model/service-type.model';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  serviceForm: FormGroup;
  serviceTypes: ServiceType[] = [];
  selectedFile: File | null = null;
  hoursOptions: string[] = ['Closed', '7:00 AM', '8:00 AM', '9:00 AM','10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'];

  constructor(private fb: FormBuilder,
     private servicesService: ServicesService,
     private imageUploadService: ImageUploadService,
     private router: Router,
     private analytics: AngularFireAnalytics
    ) {
    this.serviceForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.email]],
      Phone_Number: [''],
      Website: [''],
      Facebook: [''],
      Instagram: [''],
      Image: [''],
      Description: [''],
      Date_Created: [''],
      Community_Sponsor: [false],
      Service_Type_ID: ['',Validators.required],
      Hours: this.fb.group({
        Luni: this.fb.group({
          open: ['8:00 AM'],
          close: ['5:00 PM']
        }),
        Marti: this.fb.group({
          open: ['8:00 AM'],
          close: ['5:00 PM']
        }),
        Miercuri: this.fb.group({
          open: ['8:00 AM'],
          close: ['5:00 PM']
        }),
        Joi: this.fb.group({
          open: ['8:00 AM'],
          close: ['5:00 PM']
        }),
        Vineri: this.fb.group({
          open: ['8:00 AM'],
          close: ['5:00 PM']
        }),
        Sambata: this.fb.group({
          open: ['Closed'],
          close: ['Closed']
        }),
        Duminica: this.fb.group({
          open: ['Closed'],
          close: ['Closed']
        })
      }),
    });
  }

  ngOnInit(): void {
    this.fetchServiceTypes();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  fetchServiceTypes(): void {
    this.servicesService.getAllServiceTypes().subscribe(types => {
      this.serviceTypes = types;
    });
  }

  onSubmit(): void {
    this.analytics.logEvent('button_click', { button_name: 'add-service' });
    if (this.serviceForm.valid) {

      if (this.selectedFile) {
        this.imageUploadService.uploadImage(this.selectedFile, 'serviceImages').subscribe(downloadURL => {
          this.serviceForm.value.Image = downloadURL;
          console.log(downloadURL);
          this.saveService();
        });
      } else {
        this.saveService();
      }


    }
  }

  private formatHours(hours: any): any {
    for (const day of Object.keys(hours)) {
      if (hours[day].open === '' && hours[day].close === '') {
        hours[day] = null; // Convert empty strings to null
      }
    }
    return hours;
  }
  private saveService(): void {
      this.servicesService.addService(this.serviceForm.value).subscribe(ser =>{
        console.log('Service added successfully with ID:', ser?.id);
        this.serviceForm.reset();
        this.router.navigate(['/services', ser?.id]);
      })

  }
}
