import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from 'src/app/Services/offers.service';
import { Offers, OffersWithId } from 'src/app/Model/offers.model';
import { AuthService } from 'src/app/Services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  offer: OffersWithId | undefined;
  images: string[] = [];
  currentIndex: number = 0;
  isLoggedIn$!: Observable<boolean>;
  //   currentIndex: number = 0;
  intervalId: any;

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

  // initCarousel() {
  //   setTimeout(() => {
  //     const items = document.querySelectorAll('.carousel-item');
  //     if (items.length > 0) {
  //       items[0].classList.add('active');
  //     }
  //   }, 0);
  // }

  // startAutoPlay() {
  //   this.intervalId = setInterval(() => {
  //     this.nextSlide();
  //   }, 10000);
  // }

  // setCurrentSlide(index: number) {
  //       this.currentIndex = index;
  //       this.resetAutoPlay();
  //      }

  //         resetAutoPlay() {
  //           clearInterval(this.intervalId);
  //           this.startAutoPlay();
  //        }
  // prevSlide() {
  //   this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
  //   this.resetAutoPlay();
  // }

  // nextSlide() {
  //   this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  //   this.resetAutoPlay();
  // }
  // prevSlide() {
  //   if (this.images.length) {
  //     this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
  //     this.updateSlide();
  //   }
  // }

  // nextSlide() {
  //   if (this.images.length) {
  //     this.currentIndex = (this.currentIndex + 1) % this.images.length;
  //     this.updateSlide();
  //   }
  // }

  // updateSlide() {
  //   const items = document.querySelectorAll('.carousel-item');
  //   items.forEach((item, index) => {
  //     item.classList.toggle('active', index === this.currentIndex);
  //   });
  // }
}




// import { Component, Input, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-offer-details',
//   templateUrl: './offer-details.component.html',
//   styleUrls: ['./offer-details.component.css']
// })
// export class OfferDetailsComponent implements OnInit {
//   @Input() offer: any;
//   images: string[] = []; // Array of image URLs
//   currentIndex: number = 0;
//   intervalId: any;

//   ngOnInit() {
//     this.startAutoPlay();
//   }

//   setCurrentSlide(index: number) {
//     this.currentIndex = index;
//     this.resetAutoPlay();
//   }

//   prevSlide() {
//     this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
//     this.resetAutoPlay();
//   }

//   nextSlide() {
//     this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
//     this.resetAutoPlay();
//   }

//   startAutoPlay() {
//     this.intervalId = setInterval(() => {
//       this.nextSlide();
//     }, 10000);
//   }

//   resetAutoPlay() {
//     clearInterval(this.intervalId);
//     this.startAutoPlay();
//   }

//   goBack() {
//     // Implement the logic to go back to the offers list
//   }
// }

