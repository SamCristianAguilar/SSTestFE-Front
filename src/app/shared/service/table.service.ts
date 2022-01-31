import { TableResponse } from './../models/table.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  @Output() triggerTable: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {}


  getTables(): Observable<TableResponse[]> {
    return this.http
      .get<TableResponse[]>(`${environment.API_URL}/table`)
      .pipe(catchError(this.handlerError));
  }

  private handlerError(err: HttpErrorResponse): Observable<never> {
    const serverErrorMessage = err.error;

    if (serverErrorMessage) {
      window.alert(serverErrorMessage);
    }
    return throwError(() => serverErrorMessage);
  }
}
