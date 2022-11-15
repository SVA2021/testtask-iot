import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, Subject, tap, throwError} from 'rxjs';
import {AuthI, AuthResponseI, URL_LOGIN} from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('expDate') ?? '');
    if (new Date() > expDate) {
      this.logout();
      return null
    }
    return localStorage.getItem('token');
  }

  public error$: Subject<string> = new Subject<string>()

  login(user: AuthI): Observable<any> {
    return this.http.post<any>(URL_LOGIN, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null);
  }

  isLogged(): boolean {
    return !!this.token
  }

  private setToken(response: AuthResponseI | null): any {
    if (response) {
      const expDate = new Date(new Date().getTime() + Number(response.data.expires_at) * 1000);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('expDate', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет')
        break
    }

    return throwError(() => error)
  }
}
