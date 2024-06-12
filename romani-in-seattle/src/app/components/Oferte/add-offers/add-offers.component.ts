
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { OffersService } from 'src/app/Services/offers.service';
import { Offers, OffersWithId } from 'src/app/Model/offers.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ImageUploadService } from 'src/app/Services/image-upload.service';
import { Observable, forkJoin, from, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.css']
})
export class AddOffersComponent implements OnInit {
  offerForm: FormGroup;
 // offer!: Offers;

   offerTypes: string[] = [];
  //offerTypes!: Observable<string[]>;

  offer: OffersWithId = {
    Title: '',
    Company_Name: '',
    Contact_Name: '',
    Phone_Number: '',
    Email: '',
    Description: '',
    Location: '',
    Website: '',
    Filled: false,
    Date_Created: new Date().toISOString(),
    Price: '',
    Image1: '',
    Image2: '',
    Image3: '',
    Image4: '',
    Image5: '',
    OfferType: '',
    Facebook: '',
    Instagram: '',
    id: '',
    Community_Sponsor:false
  };
  selectedFiles: FileList | null = null;

  constructor(private fb: FormBuilder, private offersService: OffersService, private firestore: AngularFirestore, private imageUploadService: ImageUploadService, private router: Router) {
    this.offerForm = this.fb.group({
      Title: ['', Validators.required],
      Company_Name: [''],
      Contact_Name: ['', Validators.required],
      Phone_Number: ['', Validators.required],
      Email: ['', [ Validators.email]],
      Location: ['', Validators.required],
      Website: [''],
      Description: ['', Validators.required],
      Price: [''],
      Image1: [''],
      Image2: [''],
      Image3: [''],
      Image4: [''],
      Image5: [''],
      Filled: false,
      Date_Created: [''],
      OfferType: [''],
      Community_Sponsor:false
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  ngOnInit(): void {
    this.offersService.getAllOfferTypes().subscribe((types: string[]) => {
      this.offerTypes = types;
    });


  }

  onSubmit(form: NgForm): void {
    console.log(form);
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const uploadObservables: Observable<string>[] = [];
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        const uploadTask = this.imageUploadService.uploadImage(file, 'offers');
        uploadObservables.push(uploadTask);
      }


      forkJoin(uploadObservables).pipe(
        map(downloadURLs => {
          this.offer.Image1 = downloadURLs[0] || '';
          this.offer.Image2 = downloadURLs[1] || '';
          this.offer.Image3 = downloadURLs[2] || '';
          this.offer.Image4 = downloadURLs[3] || '';
          this.offer.Image5 = downloadURLs[4] || '';
        }),
        switchMap(async () => this.saveOffer())
      ).subscribe();
    } else {
      this.saveOffer().subscribe();
    }
    ///----working old code
    // if (this.offerForm.valid) {
    //   const newOffer = this.offerForm.value;

    //   this.offersService.addOffer(newOffer).then(() => {
    //     console.log('Offer added successfully');
    //     this.offerForm.reset();
    //   }).catch(error => {
    //     console.error('Error adding Offer: ', error);
    //   });
    // }
  }
  private saveOffer(): Observable<void> {
    return from(this.firestore.collection('Offers').add(this.offer).then((newOffer) => {
      console.log('Offer added with ID:', newOffer.id);
    this.router.navigate(['/offers', newOffer.id]);
  }).catch(error => {
    console.error('Error adding offer:', error);
  }));
  }

  // this.offerService.addOffer(this.offer).then(newOffer => {
  //   console.log('Offer added with ID:', newOffer.id);
  //   this.router.navigate(['/offers', newOffer.id]);
  // }).catch(error => {
  //   console.error('Error adding offer:', error);
  // });

  }
