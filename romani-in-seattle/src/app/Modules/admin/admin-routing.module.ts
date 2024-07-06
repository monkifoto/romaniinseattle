import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../../components/Admin/admin/admin.component';
import { adminAuthGuard } from 'src/app/Guard/admin-auth.guard';
import { AnalyticsComponent } from 'src/app/components/Admin/analytics/analytics.component';
import { ServicesManagementComponent } from 'src/app/components/Admin/manage-services/manage-services.component';
import { OfferManagementComponent } from 'src/app/components/Admin/offer-management/offer-management.component';
import { EventManagementComponent } from 'src/app/components/Admin/event-management/event-management.component';
import { ErrorLogComponent } from 'src/app/components/Admin/error-log/error-log.component';


// const routes: Routes = [
//   { path: '', component: AdminComponent },
//   {
//   path: 'admin',
//   component: AdminComponent,
//   canMatch: [adminAuthGuard],
//   canActivate: [adminAuthGuard],
//   children: [
//     { path: 'analytics', component: AnalyticsComponent },
//     { path: 'service-manager', component: ServicesManagementComponent },
//     { path: 'offer-management', component: OfferManagementComponent },
//     { path: 'event-management', component: EventManagementComponent }
//   ]
// }
  // Add other admin routes here
//];

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'service-manager', pathMatch: 'full' },
      { path: 'service-manager', component: ServicesManagementComponent },
      { path: 'offer-management', component: OfferManagementComponent },
      { path: 'event-management', component: EventManagementComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'error-log', component: ErrorLogComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
