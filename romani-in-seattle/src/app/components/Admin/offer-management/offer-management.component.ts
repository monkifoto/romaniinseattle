// src/app/admin/offer-management/offer-management.component.ts
import { Component, OnInit } from '@angular/core';
import { Offers, OffersWithId } from 'src/app/Model/offers.model';
import { OffersService } from 'src/app/Services/offers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-offer-management',
  templateUrl: './offer-management.component.html',
  styleUrls: ['./offer-management.component.css']
})
export class OfferManagementComponent implements OnInit {
  offers: OffersWithId[] = [];

  constructor(private offerService: OffersService,private router: Router) {}

  ngOnInit(): void {
    this.offerService.getAllOffers().subscribe((data) => {
      this.offers = data.sort((a, b) => {
        if (a.Approved === b.Approved) {
          return new Date(b.Date_Created).getTime() - new Date(a.Date_Created).getTime();
        }
        return a.Approved ? 1 : -1;
      });
    });
  }

  toggleApproval(offer: OffersWithId): void  {
    offer.Approved = !offer.Approved;
    offer.ApprovedDate = new Date().toISOString()
    this.offerService.updateOffer(offer.id!, offer);
  }
  deleteOferta(id: string): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.offerService.deleteOffer(id);
    }
  }
  navigateToEditOferte(id: string): void {
    this.router.navigate(['/edit-oferte', id]);
  }

  // onApprovedChange(offer: Offers): void {
  //   offer.Approved = !offer.Approved;
  //   offer.ApprovedDate = new Date().toISOString()
  //   this.offerService.updateOffer(offer.id!, offer);
  // }
}
