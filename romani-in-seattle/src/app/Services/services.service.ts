import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


interface Service {
  name: string;
  person: string;
  phone: string;
}


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore) { }

  getServices(): Observable<Service[]> {
    return this.firestore.collection<Service>('services').valueChanges();
  }
}



