import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { RulesComponent } from './components/rules/rules.component';
import { EventsComponent } from './components/events/events.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddJobComponent } from './components/add-job/add-job.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'events', component: EventsComponent},
  { path: 'jobs', component: JobsComponent},
  { path: 'add-service', component: AddServiceComponent },
  {path: 'add-event', component: AddEventComponent },
  { path: 'add-job', component: AddJobComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
