import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/Services/offers.service';
import { Offers, OffersWithId } from 'src/app/Model/offers.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers: OffersWithId[] = [];
  constructor(private offersService: OffersService,private router: Router) { }

  ngOnInit(): void {
    this.offersService.getOffersWithId().subscribe(offer => {
      console.log(offer);
      this.offers = offer;
    });
  }

  navigateToAddOffer(): void {
    this.router.navigate(['/add-offers']);
  }
}
