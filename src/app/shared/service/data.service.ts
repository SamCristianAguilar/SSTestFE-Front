import { environment } from './../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data1, Data2, Data3 } from '../models/data.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}


  handlerError(err: HttpErrorResponse): Observable<never> {
    const serverErrorMessage = err.error;

    if (serverErrorMessage) {
      window.alert(serverErrorMessage);
    }
    return throwError(() => serverErrorMessage);
  }
}
