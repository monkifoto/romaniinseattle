import { Component, Input, OnInit } from '@angular/core';
import { Offers } from 'src/app/Model/offers.model';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {
  @Input()
  offer!: Offers;
  currentImageIndex = 1;

  ngOnInit(): void {

    if(!this.offer.Image1){
      this.offer.Image1 = 'https://storage.cloud.google.com/romaniinseattle.appspot.com/offers/dafaultImage.jpg';
    }
    if(!this.offer.Image2){
      this.offer.Image2 = 'https://storage.cloud.google.com/romaniinseattle.appspot.com/offers/dafaultImage.jpg';
    }
    if(!this.offer.Image3){
      this.offer.Image3 = 'https://storage.cloud.google.com/romaniinseattle.appspot.com/offers/dafaultImage.jpg';
    }
    if(!this.offer.Image4){
      this.offer.Image4 = 'https://storage.cloud.google.com/romaniinseattle.appspot.com/offers/dafaultImage.jpg';
    }
    if(!this.offer.Image5){
      this.offer.Image5 = 'https://storage.cloud.google.com/romaniinseattle.appspot.com/offers/dafaultImage.jpg';
    }


    this.startImageCarousel();
  }

  startImageCarousel(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex % 5) + 1; // Loop from 1 to 5
    }, 3000); // Change image every 3 seconds
  }
  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex % 5) + 1;
  }

  prevImage(): void {
    this.currentImageIndex = ((this.currentImageIndex - 2 + 5) % 5) + 1;
  }
}
