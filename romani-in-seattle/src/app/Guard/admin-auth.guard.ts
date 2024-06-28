
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map, take } from 'rxjs/operators';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  );
};

// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../Services/auth.service';
// import { map, take } from 'rxjs/operators';

// export const adminAuthGuard = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.isLoggedIn().pipe(
//     take(1),
//     map((isLoggedIn: boolean) => {
//       if (!isLoggedIn) {
//         router.navigate(['/login']);
//         return false;
//       }
//       return true;
//     })
//   );
// };
