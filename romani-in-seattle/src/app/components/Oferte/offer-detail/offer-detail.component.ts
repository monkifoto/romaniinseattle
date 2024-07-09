import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from 'src/app/Services/offers.service';
import { Offers, OffersWithId } from 'src/app/Model/offers.model';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: OffersWithId | undefined;
  images: string[] = [];
  currentIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OffersService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.offerService.getOfferById(id).subscribe((offer: OffersWithId) => {
        this.offer = offer;
        if (this.offer && this.offer.Images) {
          this.images = this.offer.Images.filter(image => !!image); // Filter out empty images
        }
        this.initCarousel();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/offers']);
  }

  initCarousel() {
    setTimeout(() => {
      const items = document.querySelectorAll('.carousel-item');
      if (items.length > 0) {
        items[0].classList.add('active');
      }
    }, 0);
  }

  prevSlide() {
    if (this.images.length) {
      this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
      this.updateSlide();
    }
  }

  nextSlide() {
    if (this.images.length) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.updateSlide();
    }
  }

  updateSlide() {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
      item.classList.toggle('active', index === this.currentIndex);
    });
  }
}
