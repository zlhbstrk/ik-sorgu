import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Helper } from 'src/Helpers/helper';
import { Basvuru } from 'src/Models/Basvuru';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BasvuruService {

  constructor(private http:HttpClient) { }

  readonly baseURL = 'https://localhost:5001/api/Basvuru/'

  Ekle(basvuru:Basvuru) : Observable<Basvuru>
  {
   return this.http.post<Basvuru>(this.baseURL + 'Add', basvuru, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  GetirBasvuru(skipDeger:number, takeDeger:number) :Observable<Basvuru[]>
  {
    return this.http.get<Basvuru[]>(this.baseURL + "FullGetAll/" + skipDeger + "/" + takeDeger, Helper.getHeader()).pipe(catchError(this.handleError));
  }
  
  Filtre(filtre:string) :Observable<Basvuru[]>
  {
    return this.http.get<Basvuru[]>(this.baseURL + "GetAllFilter/" + filtre, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Sil(id:number)
  {
    return this.http.delete(this.baseURL + "Delete/"+ id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Duzenle(basvuru:Basvuru) : Observable<Basvuru>
  {
    return this.http.put<Basvuru>(this.baseURL + "Update", basvuru, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Getir(id:number) : Observable<Basvuru>
  {
    return this.http.get<Basvuru>(this.baseURL + "GetById/" + id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Count() : Observable<number>
  {
    return this.http.get<number>(this.baseURL + "GetCount").pipe(catchError(this.handleError));
  }

  FilterCount(filter: string): Observable<number> {
    return this.http
      .get<number>(this.baseURL + 'FilterGetCount/' + filter)
      .pipe(catchError(this.handleError));
  }

  GetSearchAndFilter(skipDeger: number, takeDeger: number, filtre: string): Observable<Basvuru[]> {
    return this.http
      .get<Basvuru[]>(this.baseURL + 'GetSearchAndFilter/'  + skipDeger + '/' + takeDeger + '/' + filtre)
      .pipe(catchError(this.handleError));
  }
  
  handleError(err: HttpErrorResponse){
    Swal.fire({
      title: "Hatalı",
      text: "Başvuru servisinde hata oluştu!",
      icon: 'error',
      confirmButtonText:'Tamam'
    })
    return throwError('Başvuru servisinde hata oluştu!');
  }
}
