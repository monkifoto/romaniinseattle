import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/Services/services.service';
import { Service, ServiceWithId } from 'src/app/Model/service.model';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  service: ServiceWithId = new ServiceWithId();
  // service$!: Observable<Service>;
  // ser: Service | undefined;
  serviceId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    this.servicesService.getService(this.serviceId).subscribe(serviceDBItem => {
        if(serviceDBItem){
          this.service.Community_Sponsor = serviceDBItem?.Community_Sponsor;
          this.service.Name = serviceDBItem.Name;
          this.service.Date_Created = serviceDBItem.Date_Created;
          this.service.Description = serviceDBItem.Description;
          this.service.Email = serviceDBItem.Email;
          this.service.Facebook = serviceDBItem.Facebook;
          this.service.Instagram = serviceDBItem.Instagram;
          this.service.Phone_Number = serviceDBItem.Phone_Number;
          this.service.Service_Type = serviceDBItem.Service_Type;
          this.service.Website = serviceDBItem.Website;
          this.service.Image = serviceDBItem.Image;
          if(this.serviceId){
            this.service.id = this.serviceId;
          }
          console.log("Image", serviceDBItem?.Image);
          if(serviceDBItem.Image == '' || serviceDBItem.Image ===undefined){
            this.service.Image = 'https://firebasestorage.googleapis.com/v0/b/romaniinseattle.appspot.com/o/serviceImages%2FdafaultImage.jpg?alt=media&token=3b0787df-12f0-444a-a426-013843534f1e'
          }
        }



      // });
    });
  }

  goBack(): void {
    this.router.navigate(['/services']);
  }
  navigateToEditService(id: string): void {
    this.router.navigate(['/edit-service', id]);
  }
}
