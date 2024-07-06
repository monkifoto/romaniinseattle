import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-oferte',
  templateUrl: './edit-oferte.component.html',
  styleUrls: ['./edit-oferte.component.css']
})
export class EditOferteComponent implements OnInit {
  offerForm: FormGroup;
  offer: any = {};
  offerId!: string;
  offerTypes: string[] = ['Type1', 'Type2', 'Type3']; // Replace with actual types
  selectedFiles: File[] = [];
  imageUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
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
      Images: ['']
    });
  }

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('id')!;
    if (this.offerId) {
      this.loadOffer();
    }
  }

  loadOffer(): void {
    this.firestore.doc(`offers/${this.offerId}`).valueChanges().subscribe((data: any) => {
      this.offer = data;
      this.offerForm.patchValue(data);
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.offerForm.valid) {
      if (this.selectedFiles.length > 0) {
        this.uploadImagesAndSaveOffer();
      } else {
        this.saveOffer();
      }
    }
  }

  uploadImagesAndSaveOffer(): void {
    const uploadTasks: Observable<any>[] = [];
    this.selectedFiles.forEach(file => {
      const filePath = `offers/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file).snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(url => {
          this.imageUrls.push(url);
          if (this.imageUrls.length === this.selectedFiles.length) {
            this.offerForm.value.Images = this.imageUrls;
            this.saveOffer();
          }
        }))
      );
      uploadTasks.push(uploadTask);
    });
    forkJoin(uploadTasks).subscribe();
  }

  saveOffer(): void {
    if (this.offerId) {
      this.firestore.doc(`offers/${this.offerId}`).update(this.offerForm.value).then(() => {
        this.router.navigate(['/offers', this.offerId]);
      });
    } else {
      this.firestore.collection('offers').add(this.offerForm.value).then((docRef) => {
        this.router.navigate(['/offers', docRef.id]);
      });
    }
  }
}
