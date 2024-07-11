import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceWithId } from 'src/app/Model/service.model';
import { ImageUploadService } from 'src/app/Services/image-upload.service';
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
  selectedFile: File | null = null;
  serviceObj: ServiceWithId = new ServiceWithId();
  oldImage: string | null = null;
  hoursOptions: string[] = ['Closed', '7:00 AM', '8:00 AM', '9:00 AM','10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService,
    private imageUploadService: ImageUploadService,
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
      Service_Type: ['', Validators.required],
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.serviceId);
    this.servicesService.getServiceById(this.serviceId).subscribe(service => {
      this.serviceForm.patchValue({
        Id : this.serviceId,
        Name: service?.Name,
        // Email: service?.Email? '' : service?.Email,
        Email: service?.Email? service.Email:'',
        Phone_Number: service?.Phone_Number? service.Phone_Number:'',
        Service_Type: service?.Service_Type,
        Website: service?.Website? service.Website: '',
        //BUG: will not update without information in facebook/instagra
        Facebook: service?.Facebook? service?.Facebook: '',
        Instagram: service?.Instagram? service?.Instagram: '',
        Description: service?.Description,
        //Image: service?.Image,
        Date_Created: service?.Date_Created,
        Date_Updated: service?.Date_Updated,
        Approved: true,//service?.Approved
        Hours: service?.Hours
      });
      console.log(this.serviceForm.value);
      if(service?.Image){
        this.oldImage = service?.Image;
      }

    });

    this.fetchServiceTypes();
  }

  fetchServiceTypes(): void {
    this.servicesService.getAllServiceTypes().subscribe(types => {
      this.serviceTypes = types;
    });
  }


  onSubmit(): void {

    if (this.serviceForm.valid) {

      this.serviceObj.id = this.serviceId? this.serviceId : '0';
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
      this.serviceObj.Date_Updated= this.serviceForm.value.Date_Updated;
      this.serviceObj.Image= this.serviceForm.value.Image;
      this.serviceObj.Hours = this.serviceForm.value.Hours;
      this.serviceObj.Approved = true;
      if (this.selectedFile) {
        console.log(this.selectedFile);
        this.imageUploadService.uploadImage(this.selectedFile, 'serviceImages').subscribe(downloadURL => {
          this.serviceObj.Image = downloadURL;
          this.saveService();
        });
      } else {
        if(this.oldImage){
          this.serviceObj.Image = this.oldImage;
        }
        this.saveService();
      }
    }

  }

  private saveService(): void {

    //  const serviceJS = {
    //     id: this.serviceObj.id,
    //     Name: this.serviceObj.Name,
    //     Phone_Number: this.serviceObj.Phone_Number,
    //     Service_Type: this.serviceObj.Service_Type,
    //     Community_Sponsor: false,
    //     Email: this.serviceObj.Email,
    //     Website: this.serviceObj.Website,
    //     Facebook: this.serviceObj.Facebook,
    //     Instagram: this.serviceObj.Instagram,
    //     Description: this.serviceObj.Description,
    //     Date_Created: this.serviceObj.Date_Created,
    //     Date_Updated: new Date().getDate.toString(),
    //     Image: this.serviceObj.Image,
    //     Approved: false,
    //     OpenHour: '',
    //     CloseHour:''
    //   };
  // console.log(serviceJS);
  let id = this.route.snapshot.paramMap.get('id')!;
      this.servicesService.updateService(id, this.serviceObj).subscribe(ser =>{
        console.log('Service updated successfully  ID:', ser?.id);
        this.serviceForm.reset();
        this.router.navigate(['/services', ser?.id]);
      })
  }
}
