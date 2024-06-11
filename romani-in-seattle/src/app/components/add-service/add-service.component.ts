import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/Services/services.service';
import { Service, ServiceWithId } from 'src/app/Model/service.model';
import { ImageUploadService } from 'src/app/Services/image-upload.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  serviceForm: FormGroup;
  serviceTypes: string[] = [];
  selectedFile: File | null = null;
  serviceObj: ServiceWithId = new ServiceWithId;

  constructor(private fb: FormBuilder, private servicesService: ServicesService, private imageUploadService: ImageUploadService) {
    this.serviceForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone_Number: [''],
      Website: [''],
      Facebook: [''],
      Instagram: [''],
      Image: [''],
      Description: [''],
      Date_Created: [''],
      Community_Sponsor: [''],
      Service_Type: ['', Validators.required],
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
    if (this.serviceForm.valid) {


      this.serviceObj.Name = this.serviceForm.value.Name;
      this.serviceObj.Phone_Number= this.serviceForm.value.Phone_Number;
      this.serviceObj.Service_Type= this.serviceForm.value.Service_Type;
      this.serviceObj.Community_Sponsor= false;
      this.serviceObj.Email= this.serviceForm.value.Email;
      this.serviceObj.Website= this.serviceForm.value.Website;
      this.serviceObj.Facebook= this.serviceForm.value.Facebook;
      this.serviceObj.Instagram= this.serviceForm.value.Instagram;
      this.serviceObj.Description= this.serviceForm.value.Description;
      this.serviceObj.Date_Created= this.serviceForm.value.Date_Created;
      this.serviceObj.Image= this.serviceForm.value.Image;

      if (this.selectedFile) {
        this.imageUploadService.uploadImage(this.selectedFile, 'serviceImages').subscribe(downloadURL => {
          this.serviceObj.Image = downloadURL;
          console.log(downloadURL);
          this.saveService();
        });
      } else {
        this.saveService();
      }

      // this.servicesService.addService(Service).then(() => {
      //   console.log('Service added successfully');
      //   this.serviceForm.reset();
      // }).catch((error:Error | any) => {
      //   console.error('Error adding service: ', error);
      // });
    }
  }

  private saveService(): void {
    //if (this.serviceObj.id) {

     const serviceJS = {
        id: this.serviceObj.id,
        Name: this.serviceObj.Name,
        Phone_Number: this.serviceObj.Phone_Number,
        Service_Type: this.serviceObj.Service_Type,
        Community_Sponsor: false,
        Email: this.serviceObj.Email,
        Website: this.serviceObj.Website,
        Facebook: this.serviceObj.Facebook,
        Instagram: this.serviceObj.Instagram,
        Description: this.serviceObj.Description,
        Date_Created: this.serviceObj.Date_Created,
        Image: this.serviceObj.Image
      };

      this.servicesService.addService(serviceJS).then(() => {
          console.log('Service added successfully');
          this.serviceForm.reset();
        }).catch((error:Error | any) => {
          console.error('Error adding service: ', error);
        });
      }
  //}
}
