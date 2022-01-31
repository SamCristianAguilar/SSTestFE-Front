import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data2 } from '../models/data.interface';

@Injectable({
  providedIn: 'root'
})
export class Data2Service {

constructor(private http: HttpClient, private dataService: DataService) { }

getAll(): Observable<Data2[]> {
  return this.http
    .get<Data2[]>(`${environment.API_URL}/TableData2`)
    .pipe(catchError(this.dataService.handlerError));
}

getById(id: number): Observable<Data2> {
  return this.http
    .get<Data2>(`${environment.API_URL}/TableData2/${id}`)
    .pipe(catchError(this.dataService.handlerError));
}

createOne(data: Data2): Observable<Data2> {
  return this.http
    .post<Data2>(`${environment.API_URL}/TableData2/`, data)
    .pipe(catchError(this.dataService.handlerError));
}

editOne(id: number, data: Data2): Observable<Data2> {
  return this.http
    .put<Data2>(`${environment.API_URL}/TableData2/${id}`, data)
    .pipe(catchError(this.dataService.handlerError));
}

deleteOne(id: number): Observable<any> {
  return this.http
    .delete<any>(`${environment.API_URL}/TableData2/${id}`)
    .pipe(catchError(this.dataService.handlerError));
}
}
