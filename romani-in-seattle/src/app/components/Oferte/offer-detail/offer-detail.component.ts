import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from 'src/app/Services/offers.service';
import { Offers, OffersWithId } from 'src/app/Model/offers.model';
import { AuthService } from 'src/app/Services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: OffersWithId | undefined;
  images: string[] = [];
  currentIndex: number = 0;
  isLoggedIn$!: Observable<boolean>;
  //   currentIndex: number = 0;
  intervalId: any;
  svgInstagramIcon = '../../../assets/images/SVG/instagram-icon.svg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OffersService,
    private authService: AuthService
  )  {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.offerService.getOfferById(id).subscribe((offer: OffersWithId) => {
        this.offer = offer;
        if (this.offer && this.offer.Images) {
          this.images = this.offer.Images.filter(image => !!image); // Filter out empty images
        }
        //this.initCarousel();
        this.startAutoPlay();
      });
    }
  }


  setCurrentSlide(index: number) {
    this.currentIndex = index;
    console.log(`Current Slide Set To: ${index}`);
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
    console.log(`Previous Slide: ${this.currentIndex}`);
    this.resetAutoPlay();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
    console.log(`Next Slide: ${this.currentIndex}`);
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 10000);
  }

  resetAutoPlay() {
    clearInterval(this.intervalId);
    this.startAutoPlay();
  }

  goBack(): void {
    this.router.navigate(['/offers']);
  }

  sendEmail(email: string | undefined): void {
    window.location.href = `mailto:${email}`;
  }

  shareLink(): void {
    const baseUrl = 'https://romaniinseattle.com';
    const queryParams = this.router.url;
    const shareUrl = `${baseUrl}${queryParams}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }
}
