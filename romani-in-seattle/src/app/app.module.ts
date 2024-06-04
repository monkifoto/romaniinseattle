import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './components/services/services.component';
import { RulesComponent } from './components/rules/rules.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobsComponent } from './components/jobs/jobs.component';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { provideStorage, getStorage} from '@angular/fire/storage';
import { FooterComponent } from './components/footer/footer.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddJobComponent } from './components/add-job/add-job.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesComponent,
    RulesComponent,
    NavigationComponent,
    EventsComponent,
    JobsComponent,
    FooterComponent,
    AddServiceComponent,
    AddEventComponent,
    AddJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideFirestore(()=>getFirestore()),
    provideStorage(()=> getStorage()),
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
