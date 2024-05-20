import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { RulesComponent } from './components/rules/rules.component';
import { EventsComponent } from './components/events/events.component';
import { JobsComponent } from './components/jobs/jobs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'events', component: EventsComponent},
  { path: 'jobs', component: JobsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
