import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploadService } from 'src/app/Services/image-upload.service';
import { Observable, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { OffersService } from 'src/app/Services/offers.service';
import { Offers, OffersWithId } from 'src/app/Model/offers.model';

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
  offer: OffersWithId | undefined;

  constructor(
    private fb: FormBuilder,
    private offersService: OffersService,
    private imageUploadService: ImageUploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.offerForm = this.fb.group({
      Title: ['', Validators.required],
      Company_Name: [''],
      Contact_Name: ['', Validators.required],
      Phone_Number: [''],
      Email: ['', [Validators.email]],
      Location: [''],
      Website: [''],
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
          this.images = offer.Images.map(url => ({ name: '', url }));
        }
      });
    });
    this.fetchOfferTypes();
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.imageUploadStatus[file.name] = 'Uploading...';

      const image: { name: string, url: string, file: File, progress?: number } = { name: file.name, url: '', file: file, progress: 0 };
      this.images.push(image);

      this.imageUploadService.uploadOfferImage(file, this.offerId).subscribe(
        {
          next: (progress: number | string) => {
            if (typeof progress === 'string') {
              image.url = progress;
              this.offer!.Images.push(progress);
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
    if (this.offerForm.valid) {
      this.offer!.Title = this.offerForm.value.Title;
      this.offer!.Phone_Number = this.offerForm.value.Phone_Number;
      this.offer!.Price = this.offerForm.value.Price;
      this.offer!.Community_Sponsor = this.offerForm.value.Community_Sponsor;
      this.offer!.Company_Name = this.offerForm.value.Company_Name;
      this.offer!.Contact_Name = this.offerForm.value.Contact_Name;
      this.offer!.Website = this.offerForm.value.Website;
      this.offer!.Email = this.offerForm.value.Email;
      this.offer!.Location = this.offerForm.value.Location;
      this.offer!.OfferType = this.offerForm.value.OfferType;
      this.offer!.Description = this.offerForm.value.Description;
      this.offer!.Date_Updated = new Date().toISOString();
      this.offersService.updateOffer(this.offerId, this.offer!).subscribe(() => {
        this.router.navigate(['/offers']);
      });
    }
  }
}
