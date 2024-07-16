import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploadService } from 'src/app/Services/image-upload.service';
import { Observable, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { OffersService } from 'src/app/Services/offers.service';
import { Offers, OffersWithId } from 'src/app/Model/offers.model';
import Pica from 'pica';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-edit-oferte',
  templateUrl: './edit-oferte.component.html',
  styleUrls: ['./edit-oferte.component.css']
})
export class EditOferteComponent implements OnInit {
  offerForm: FormGroup;
  offerTypes: string[] = [];
  images: { name: string, url: string, file?: File, progress?: number }[] = [];
  imageUploadStatus: { [key: string]: string } = {};
  offerId: string = '';

  offer: OffersWithId = {
    Title: '',
    Company_Name: '',
    Contact_Name: '',
    Phone_Number: '',
    Email: '',
    Description: '',
    Price: '',
    Location: '',
    Website: '',
    OfferType: '',
    Community_Sponsor: false,
    Date_Created: '',
    Date_Updated: '',
    Hours: {},
    Images: [],
    id: '',
    Facebook: '',
    Instagram: '',
    Filled: false,
    Approved: false,
    ApprovedDate: ''
  };

  constructor(
    private fb: FormBuilder,
    private offersService: OffersService,
    private imageUploadService: ImageUploadService,
    private router: Router,
    private route: ActivatedRoute,
    private analytics: AngularFireAnalytics
  ) {
    this.offerForm = this.fb.group({
      Title: ['', Validators.required],
      Company_Name: [''],
      Contact_Name: ['', Validators.required],
      Phone_Number: [''],
      Email: ['', [Validators.email]],
      Location: [''],
      Website: [''],
      Facebook: [''],
      Instagram: [''],
      Description: ['', Validators.required],
      Price: [''],
      Images: [],
      Filled: false,
      Date_Created: [''],
      ApprovedDate: [''],
      OfferType: [''],
      Community_Sponsor: false,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.offerId = params.get('id')!;
      this.offersService.getOfferById(this.offerId).subscribe(offer => {
        if (offer) {
          this.offer = offer;
          this.offerForm.patchValue(offer);
          if(offer.Images){
            this.images = offer.Images.map(url => ({ name: '', url }));
          }
          else{
            offer.Images = [];
          }

        }
      });
    });
    this.fetchOfferTypes();
  }

  // async onFileSelected(event: any) {
  //   const files: FileList = event.target.files;
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const resizedFile = await this.resizeImage(file);
  //     this.imageUploadStatus[file.name] = 'Uploading...';

  //     this.imageUploadService.uploadOfferImage(resizedFile, this.offerId).subscribe(
  //       (downloadURL: string) => {
  //         this.offer!.Images.push(downloadURL);
  //         this.images.push({ name: file.name, url: downloadURL, file: file });
  //         this.imageUploadStatus[file.name] = 'Uploaded';
  //       },
  //       (error: any) => {
  //         console.error('Image upload failed: ', error);
  //         this.imageUploadStatus[file.name] = 'Failed to upload';
  //       }
  //     );
  //   }
  // }

  async onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const resizedFile = await this.resizeImage(file);
      this.imageUploadStatus[file.name] = 'Uploading...';

      const image: { name: string, url: string, file: File, progress?: number } = { name: file.name, url: '', file: file, progress: 0 };
      this.images.push(image);

      this.imageUploadService.uploadOfferImage(resizedFile, this.offerId).subscribe(
        {
          next: (progress: number | string) => {
            console.log("OnFileSelected/uploadImage/Next", this.offer.Images)
            if (typeof progress === 'string') {
              image.url = progress;

              this.offer!.Images.push(progress);
              console.log("Image uploaded to offer:" , this.offer?.Images);
              this.imageUploadStatus[file.name] = 'Uploaded';
            } else {
              image.progress = progress;
            }
          },
          error: (error: any) => {
            console.error('Image upload failed: ', error);
            this.imageUploadStatus[file.name] = 'Failed to upload';
          }
        }
      );
    }
  }

  removeImage(image: { name: string, url: string, file?: File }): void {
    this.images = this.images.filter(img => img !== image);
    this.offer!.Images = this.offer!.Images.filter(url => url !== image.url);
    this.imageUploadService.deleteOfferImage(image.url).subscribe(() => {
      this.offersService.updateOffer(this.offerId, this.offer!).subscribe();
    });
  }

  fetchOfferTypes(): void {
    this.offersService.getAllOfferTypes().subscribe(types => {
      this.offerTypes = types;
    });
  }

  onSubmit(): void {
    this.analytics.logEvent('button_click', { button_name: 'edit-offer' });
    if (this.offerForm.valid) {
      this.offer.Title = this.offerForm.value.Title;
      this.offer.Phone_Number = this.offerForm.value.Phone_Number;
      this.offer.Price = this.offerForm.value.Price;
      this.offer.Community_Sponsor = this.offerForm.value.Community_Sponsor;
      this.offer.Company_Name = this.offerForm.value.Company_Name;
      this.offer.Contact_Name = this.offerForm.value.Contact_Name;
      this.offer.Website = this.offerForm.value.Website;
      this.offer.Email = this.offerForm.value.Email;
      this.offer.Location = this.offerForm.value.Location;
      this.offer.OfferType = this.offerForm.value.OfferType;
      this.offer.Description = this.offerForm.value.Description;
      this.offer.Date_Updated = new Date().toISOString();
      this.offer.Instagram = this.offerForm.value.Instagram;
      this.offer.Facebook = this.offerForm.value.Facebook;
      console.log('offer:', this.offer!);
      this.offersService.updateOffer(this.offerId, this.offer!).subscribe(() => {
        this.router.navigate(['/offers']);
      });
    }
  }


  async resizeImage(file: File): Promise<File> {
    const pica = Pica();
    const img = new Image();
    img.src = URL.createObjectURL(file);

    return new Promise((resolve, reject) => {
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const maxSide = 1024;
        const scaleFactor = Math.min(maxSide / img.width, maxSide / img.height);
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;

        try {
          await pica.resize(img, canvas);
          canvas.toBlob((blob: Blob | null) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, { type: file.type });
              resolve(resizedFile);
            } else {
              reject(new Error('Image resizing failed'));
            }
          }, file.type);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = (error) => reject(error);
    });
  }

  goBack(): void {
    this.analytics.logEvent('button_click', { button_name: 'back-to-services' });
    if (this.offerId) {
      this.router.navigate(['/services', this.offerId]);
    } else {
      this.router.navigate(['/services']);
    }
  }
}
