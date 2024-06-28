import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from 'src/app/components/Admin/admin/admin.component';
import { AnalyticsComponent } from 'src/app/components/Admin/analytics/analytics.component';
import { ServicesManagementComponent } from 'src/app/components/Admin/manage-services/manage-services.component';
import { OfferManagementComponent } from 'src/app/components/Admin/offer-management/offer-management.component';
import { EventManagementComponent } from 'src/app/components/Admin/event-management/event-management.component';
import { FormsModule } from '@angular/forms';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent },
  // Add other routes here
];

@NgModule({
  declarations: [
    AdminComponent,
    AnalyticsComponent,
    ServicesManagementComponent,
    OfferManagementComponent,
    EventManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
