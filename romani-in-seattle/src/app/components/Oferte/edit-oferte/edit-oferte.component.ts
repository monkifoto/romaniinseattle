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
  selectedFiles: FileList | null = null;
  images: { name: string, url: string, file: File }[] = [];

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
  offerId!: string;
  imageUrls: any;
  oldImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private imageUploadService: ImageUploadService,
    private offerService: OffersService
  ) {
    this.offerForm = this.fb.group({
      Title: ['', Validators.required],
      Company_Name: ['', Validators.required],
      Contact_Name: ['', Validators.required],
      Phone_Number: ['', Validators.required],
      Email: ['', [Validators.email, Validators.required]],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
      Location: ['', Validators.required],
      Website: [''],
      OfferType: ['', Validators.required],
      Images: [],
    });
  }

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.offerId);
    this.offerService.getOfferById(this.offerId).subscribe(ofr =>{
      this.offerForm.patchValue({
        Id: this.offerId,
        Contact_Name: ofr?.Contact_Name,
        Company_Name :ofr?.Company_Name,
        Email: ofr?.Email,
        Website: ofr?.Website,
        Description : ofr?.Description,
        Date_Created : ofr?.Date_Created,
        Date_Updated: ofr?.Date_Updated,
        ApprovedDate: ofr?.ApprovedDate,
        Approved: ofr?.Approved,
        Community_Sponsor: ofr?.Community_Sponsor,
        Facebook: ofr?.Facebook,
        Images: ofr?.Images,
        Filled: ofr?.Filled

      });
      console.log(this.offerForm.value);
      if(ofr?.Images){
        this.oldImages = ofr.Images;
      }
    });
    this.fetchOfferTypes();
    // if (this.offerId) {
    //   this.loadOffer();
    // }
    // this.offerService.getAllOfferTypes().subscribe((types: string[]) => {
    //   this.offerTypes = types;
    // });
  }

  fetchOfferTypes(): void {
    this.offerService.getAllOfferTypes().subscribe(types => {
      this.offerTypes = types;
    });
  }

  // loadOffer(): void {
  //   this.offerService.getOfferById(this.offerId).subscribe((data: OffersWithId | undefined) => {
  //     if (data) {
  //       this.offer = data;
  //       console.log(data);
  //       this.offerForm.patchValue(data);
  //     }
  //   });
  // }

  onFileSelected(event: any): void {
    //this.selectedFiles = event.target.files;
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({ name: file.name, url: e.target.result, file: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.offerForm.valid) {
      // if (this.selectedFiles.length > 0) {
      //   this.uploadImagesAndSaveOffer();
      // } else {
      //   this.saveOffer();
      // }
      this.offer.Images = this.images.map(img => img.url);
      this.offerService.updateOffer(this.offer.id!, this.offer).subscribe({
        next: updatedOffer => {
          if (updatedOffer) {
            this.uploadImages(updatedOffer.id);
          }
        },
        error: error => {
          console.error('Error updating offer:', error);
        }
      });
    }
  }

  uploadImages(offerId: string): void {
    this.images.filter(img => img.file).forEach(image => {
      this.imageUploadService.uploadOfferImage(image.file!, offerId).subscribe({
        next: url => {
          if (this.offer && this.offer.Images.length < 10) {
            this.offer.Images.push(url);
            this.offerService.updateOffer(offerId, this.offer).subscribe();
          }
        },
        error: error => {
          console.error('Error uploading image:', error);
        }
      });
    });
  }

  removeImage(image: { name: string, url: string, file?: File }): void {
    this.images = this.images.filter(img => img !== image);
  }

  // uploadImagesAndSaveOffer(): void {
  //   const uploadTasks: Observable<any>[] = [];
  //   this.selectedFiles.forEach(file => {
  //     const filePath = `offers/${Date.now()}_${file.name}`;
  //     const fileRef = this.storage.ref(filePath);
  //     const uploadTask = this.storage.upload(filePath, file).snapshotChanges().pipe(
  //       finalize(() => fileRef.getDownloadURL().subscribe(url => {
  //         this.imageUrls.push(url);
  //         if (this.imageUrls.length === this.selectedFiles.length) {
  //           this.offerForm.value.Images = this.imageUrls;
  //           this.saveOffer();
  //         }
  //       }))
  //     );
  //     uploadTasks.push(uploadTask);
  //   });
  //   forkJoin(uploadTasks).subscribe();
  // }

  saveOffer(): void {
    // if (this.offerId) {
    //   this.firestore.doc(`offers/${this.offerId}`).update(this.offerForm.value).then(() => {
    //     this.router.navigate(['/offers', this.offerId]);
    //   });
    // } else {
    //   this.firestore.collection('offers').add(this.offerForm.value).then((docRef) => {
    //     this.router.navigate(['/offers', docRef.id]);
    //   });
    // }
  }
}
