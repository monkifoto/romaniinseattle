import { Component, Input, OnInit } from '@angular/core';
import { Offers, OffersWithId } from 'src/app/Model/offers.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {
  @Input()
  offer!: OffersWithId;
  currentImageIndex = 0;
  images: string[] = [];
  defaultImage = 'https://storage.cloud.google.com/romaniinseattle.appspot.com/offers/defaultImage.jpg';


  constructor(private router: Router) {}
  ngOnInit(): void {
    console.log(this.offer);

    if (this.offer?.Images?.length) {
      this.images = this.offer.Images;
    } else {
      this.images = [this.defaultImage];
    }

    this.startImageCarousel();
  }

  startImageCarousel(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 15000); // Change image every 3 seconds
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  navigateToDetails(): void {
    console.log('Navigating to details:', this.offer.id);
    this.router.navigate(['/offers', this.offer.id]);
  }
}
