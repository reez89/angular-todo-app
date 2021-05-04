import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localid: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient){}
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOLTU0ABCoSO9EWPXvFN1z5CgC11VaKEA', {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localid,
          resData.idToken,
          +resData.expiresIn
          )
      })
    );
  }

  login(email: string, password: string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOLTU0ABCoSO9EWPXvFN1z5CgC11VaKEA', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError));
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
    ){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
          email,
          userId,
          token,
          expirationDate
          );
    this.user.next(user);
  }
  private handleError(errorRes: HttpErrorResponse){

    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password, please try again!';
        break;
    }

    return throwError(errorMessage);
  }
}

