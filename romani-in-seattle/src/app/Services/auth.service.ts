// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.afAuth.authState;
  }

  // async login(email: string, password: string) {
  //   try {
  //     await this.afAuth.signInWithEmailAndPassword(email, password);
  //     this.router.navigate(['/admin']);
  //   } catch (error) {
  //     console.error('Login error', error);
  //   }
  // }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }
}

