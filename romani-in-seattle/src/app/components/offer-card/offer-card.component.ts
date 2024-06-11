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
