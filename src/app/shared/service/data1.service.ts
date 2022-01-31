import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data1 } from '../models/data.interface';

@Injectable({
  providedIn: 'root',
})
export class Data1Service {
  constructor(private http: HttpClient, private dataService: DataService) {}

  getAll(): Observable<Data1[]> {
    return this.http
      .get<Data1[]>(`${environment.API_URL}/TableData1`)
      .pipe(catchError(this.dataService.handlerError));
  }

  getById(id: number): Observable<Data1> {
    return this.http
      .get<Data1>(`${environment.API_URL}/TableData1/${id}`)
      .pipe(catchError(this.dataService.handlerError));
  }

  createOne(data: Data1): Observable<Data1> {
    return this.http
      .post<Data1>(`${environment.API_URL}/TableData1/`, data)
      .pipe(catchError(this.dataService.handlerError));
  }

  editOne(id: number, data: Data1): Observable<Data1> {
    return this.http
      .put<Data1>(`${environment.API_URL}/TableData1/${id}`, data)
      .pipe(catchError(this.dataService.handlerError));
  }

  deleteOne(id: number): Observable<any> {
    return this.http
      .delete<any>(`${environment.API_URL}/TableData1/${id}`)
      .pipe(catchError(this.dataService.handlerError));
  }
}
