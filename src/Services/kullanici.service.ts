import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Helper } from 'src/Helpers/helper';
import { Kullanici } from 'src/Models/Kullanici';
import Swal from 'sweetalert2';

@Injectable()
export class KullaniciService {
  constructor(private http: HttpClient, private router: Router) {}

  loggedIn = false;
  readonly baseURL = 'https://api.backendless.com/F3D79996-4F23-4BAC-ADE7-F8FE5E09C133/87D19798-66CA-49B1-B9F6-E3E6DBA404BF/';

  Ekle(kullanici: Kullanici): Observable<Kullanici> {
    return this.http.post<Kullanici>(this.baseURL + 'users/register', kullanici, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  GetirKullanici(): Observable<Kullanici[]> {
    return this.http.get<Kullanici[]>(this.baseURL + 'data/users', Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Sil(id: string) {
    return this.http.delete(this.baseURL + 'data/users/' + id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Getir(id: string): Observable<Kullanici> {
    return this.http
      .get<Kullanici>(this.baseURL + 'data/users?where=objectId%3D%27' + id + '%27', Helper.getHeader())
      .pipe(catchError(this.handleError));
  }

  Login(email: string, sifre: string): Observable<Kullanici> {
    return this.http
      .post<Kullanici>(this.baseURL + 'users/login', { login: email, password: sifre }, Helper.getHeaderUnAuth(email))
      .pipe(catchError(this.handleError));
  }

  kulAdi() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!) as any;
    return currentUser.name;
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.loggedIn = false;
    return null;
  }

  handleError(err: HttpErrorResponse) {
    Swal.fire({
      title: 'Hatalı',
      text: 'Kullanıcı servisinde hata oluştu!',
      icon: 'error',
      confirmButtonText: 'Tamam',
    });
    return throwError('Kullanıcı servisinde hata oluştu!');
  }
}
