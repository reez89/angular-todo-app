import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap,  map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import * as AuthAction from './auth.action';
import { of } from 'rxjs';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localid: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
@Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthAction.LOGIN_START),
    switchMap((authData: AuthAction.LoginStart) => {
      // tslint:disable-next-line: max-line-length
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIkey , {

      email: authData.payload.email,
      password: authData.payload.password,
      returnSecureToken: true
      }
    ).pipe(
      map(resData => {
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        // tslint:disable-next-line: max-line-length
        return of(new AuthAction.Login({email: resData.email, userId: resData.localid, token: resData.idToken, expirationDate: expirationDate}));
      }),
      catchError(error => {
      return of();
    }),
    );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient){}

}
