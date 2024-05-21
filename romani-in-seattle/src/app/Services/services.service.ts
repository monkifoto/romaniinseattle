import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


interface Service {
  Name: string;
  Service_Type: string;
  Phone_Number: string;
  Email:string;
  Description:string;
  Website:string;
  Comunity_Sponsor: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore) { }

  getServices(): Observable<Service[]> {
    return this.firestore.collection<Service>('Services').valueChanges();
  }
}



