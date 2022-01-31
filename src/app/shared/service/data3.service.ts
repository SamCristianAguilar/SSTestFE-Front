import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data3 } from '../models/data.interface';

@Injectable({
  providedIn: 'root'
})
export class Data3Service {

constructor(private http: HttpClient, private dataService: DataService) { }

getAll(): Observable<Data3[]> {
  return this.http
    .get<Data3[]>(`${environment.API_URL}/TableData3`)
    .pipe(catchError(this.dataService.handlerError));
}

getById(id: number): Observable<Data3> {
  return this.http
    .get<Data3>(`${environment.API_URL}/TableData3/${id}`)
    .pipe(catchError(this.dataService.handlerError));
}

createOne(data: Data3): Observable<Data3> {
  return this.http
    .post<Data3>(`${environment.API_URL}/TableData3/`, data)
    .pipe(catchError(this.dataService.handlerError));
}

editOne(id: number, data: Data3): Observable<Data3> {
  return this.http
    .put<Data3>(`${environment.API_URL}/TableData3/${id}`, data)
    .pipe(catchError(this.dataService.handlerError));
}

deleteOne(id: number): Observable<any> {
  return this.http
    .delete<any>(`${environment.API_URL}/TableData3/${id}`)
    .pipe(catchError(this.dataService.handlerError));
}

}
