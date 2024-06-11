import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from 'src/app/Services/offers.service';
import { Offers } from 'src/app/Model/offers.model';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: Offers | undefined;
  images: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OffersService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.offerService.getOfferById(id).subscribe((offer: Offers | any) => {
        this.offer = offer;
        this.images = [
          offer.Image1,
          offer.Image2,
          offer.Image3,
          offer.Image4,
          offer.Image5,
        ].filter(image => !!image); // Filter out empty images
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/offers']);
  }
}
