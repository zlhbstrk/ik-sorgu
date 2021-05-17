import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Helper } from 'src/Helpers/helper';
import { Basvuru } from 'src/Models/Basvuru';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class BasvuruService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'https://api.backendless.com/F3D79996-4F23-4BAC-ADE7-F8FE5E09C133/87D19798-66CA-49B1-B9F6-E3E6DBA404BF/';

  Ekle(basvuru: Basvuru): Observable<Basvuru> {
    return this.http.post<Basvuru>(this.baseURL + 'data/basvuru', basvuru, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  GetirBasvuru(): Observable<any[]> {
    return this.http
      .get<Basvuru[]>(this.baseURL + 'data/basvuru')
      .pipe(catchError(this.handleError));
  }

  Sil(id: string) {
    return this.http.delete(this.baseURL + 'data/Basvuru/' + id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Getir(id: string): Observable<Basvuru> {
    return this.http.get<Basvuru>(this.baseURL + 'data/Basvuru?where=objectId%3D%27' + id + '%27', Helper.getHeader()).pipe(catchError(this.handleError));
  }

  GetSearch(filtre: string): Observable<any[]> {
    var queryParams = "ad%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "soyad%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "email%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "cinsiyet%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "ogrenimDurumu%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "askerlikDurumu%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "meslek%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "il%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "ilce%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "mahalle%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "adres%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "dil%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "programlamaDilleri%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "sertifikalar%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "hobiler%20LIKE%20%27%25"+filtre+"%25%27"+ "%20or%20"+
    "yas%20LIKE%20%27%25"+filtre+"%25%27";

    return this.http
      .get<Basvuru[]>(this.baseURL + 'data/Basvuru?where=' + queryParams)
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    Swal.fire({
      title: 'Hatalı',
      text: 'Başvuru servisinde hata oluştu!',
      icon: 'error',
      confirmButtonText: 'Tamam',
    });
    return throwError('Başvuru servisinde hata oluştu!');
  }
}
