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
  images?: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OffersService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.offerService.getOfferById(id).subscribe((offer: OffersWithId | any) => {
        this.offer = offer;
        console.log(this.offer);
        this.images = this.offer?.Images?.filter(image => !!image); // Filter out empty images
      });
      setTimeout(() => this.initCarousel(), 0);
    }
  }

  goBack(): void {
    this.router.navigate(['/offers']);
  }
  initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    const showSlide = (index: number) => {
      items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
    };

    this.prevSlide = () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
      showSlide(currentIndex);
    };

    this.nextSlide = () => {
      currentIndex = (currentIndex + 1) % items.length;
      showSlide(currentIndex);
    };

    showSlide(currentIndex);
  }

  prevSlide() {
    // Placeholder for the prevSlide function
  }

  nextSlide() {
    // Placeholder for the nextSlide function
  }
}

