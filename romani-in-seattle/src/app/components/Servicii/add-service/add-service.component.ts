import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/Services/services.service';
import { Service, ServiceWithId } from 'src/app/Model/service.model';
import { ImageUploadService } from 'src/app/Services/image-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  serviceForm: FormGroup;
  serviceTypes: string[] = [];
  selectedFile: File | null = null;
  serviceObj: ServiceWithId = new ServiceWithId();

  constructor(private fb: FormBuilder, private servicesService: ServicesService, private imageUploadService: ImageUploadService, private router: Router) {
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
      this.serviceObj.Approved = true;

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
        Date_Created: new Date().getDate.toString(),
        Date_Updated: new Date().getDate.toString(),
        Image: this.serviceObj.Image,
        Approved: false,
        OpenHour: '',
        CloseHour:''
      };

      this.servicesService.addService(serviceJS).subscribe(ser =>{
        console.log('Service added successfully with ID:', ser?.id);
        this.serviceForm.reset();
        this.router.navigate(['/services', ser?.id]);
      })
      // then((newSer:any) => {
      //     console.log('Service added successfully with ID:', newSer.id);
      //     this.serviceForm.reset();
      //     this.router.navigate(['/services', newSer.id]);
      //   }).catch((error:Error | any) => {
      //     console.error('Error adding service: ', error);
      //   });

        // this.servicesService.addService(serviceJS).(newService) => {
        //   console.log('Service added with ID:', newService.id);
        //   this.router.navigate(['/services', newService.id]);
        // }).catch((error: any) => {
        //   console.error('Error adding service:', error);
        // });

  }
  //}
}
