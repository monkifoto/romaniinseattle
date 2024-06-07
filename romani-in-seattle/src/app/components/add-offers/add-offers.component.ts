
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffersService } from 'src/app/Services/offers.service';
import { Offers } from 'src/app/Model/offers.model';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.css']
})
export class AddOffersComponent implements OnInit {
  offerForm: FormGroup;

  offerTypes: string[] = [];

  constructor(private fb: FormBuilder, private offersService: OffersService) {
    this.offerForm = this.fb.group({
      Title: ['', Validators.required],
      Company_Name: [''],
      Contact_Name: ['', Validators.required],
      Phone_Number: ['', Validators.required],
      Email: ['', [ Validators.email]],
      Location: ['', Validators.required],
      Website: [''],
      Description: ['', Validators.required],
      Image1: [''],
      Image2: [''],
      Image3: [''],
      Image4: [''],
      Image5: [''],
      Filled: false,
      Date_Created: [''],
      OfferType: ['']
    });
  }

  ngOnInit(): void {
    this.offersService.getAllOfferTypes().subscribe((types) => {
      this.offerTypes = types;
    });

  }

  onSubmit(): void {
    if (this.offerForm.valid) {
      const newOffer = this.offerForm.value;

      this.offersService.addOffer(newOffer).then(() => {
        console.log('Offer added successfully');
        this.offerForm.reset();
      }).catch(error => {
        console.error('Error adding Offer: ', error);
      });
    }
  }
}
