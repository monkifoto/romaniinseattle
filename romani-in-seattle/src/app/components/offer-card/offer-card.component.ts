import { Component, Input, OnInit } from '@angular/core';
import { Offers } from 'src/app/Model/offers.model';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {
  @Input()
  offer: Offers = new Offers;
  currentSlide = 0;
  totalSlides = 0;

  ngOnInit(): void {
    this.totalSlides = this.getOfferImages().length;
  }

  getOfferImages(): string[] {
    return [
      this.offer.Image1,
      this.offer.Image2,
      this.offer.Image3,
      this.offer.Image4,
      this.offer.Image5
    ].filter(image => image);
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.totalSlides - 1;
    this.updateCarousel();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide < this.totalSlides - 1) ? this.currentSlide + 1 : 0;
    this.updateCarousel();
  }

  updateCarousel(): void {
    const offset = -this.currentSlide * 100;
    const carouselInner = document.querySelector('.carousel-inner') as HTMLElement;
    carouselInner.style.transform = `translateX(${offset}%)`;
  }
}
