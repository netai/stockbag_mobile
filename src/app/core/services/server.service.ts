import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../../app.config'
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ServerService {

  httpOptions = {
    headers: {},
    params: {}
  };

  constructor(
    private _http: HttpClient,
    private _ms: MessageService
  ) {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('AUTH_TOKEN') ? localStorage.getItem('AUTH_TOKEN') : 'none'
    });
  }

  public getData(url: string, params: any = null): Observable<any> {
    this.httpOptions.params = params;
    return this._http.get(AppConfig.API_BASE_URL + url, this.httpOptions)
      .pipe(
        tap((response: Response) => {
          return response;
        }),
        catchError((serverError: Response) => {
          this._errorHandler(serverError)
          return throwError(serverError)
        })
      );
  }

  public postData(url: string, postData: any): Observable<any> {
    this.httpOptions.params = null
    return this._http.post(AppConfig.API_BASE_URL + url, postData, this.httpOptions)
      .pipe(
        tap((response: Response) => {
          return response;
        }),
        catchError((serverError: Response) => {
          this._errorHandler(serverError)
          return throwError(serverError)
        })
      );
  }

  public deleteData(url: string): Observable<any> {
    this.httpOptions.params = null
    return this._http.delete(AppConfig.API_BASE_URL + url, this.httpOptions)
      .pipe(
        tap((response: Response) => {
          return response;
        }),
        catchError((serverError: Response) => {
          this._errorHandler(serverError)
          return throwError(serverError)
        })
      );
  }

  public putData(url: string, postData: any): Observable<any> {
    this.httpOptions.params = null
    return this._http.put(AppConfig.API_BASE_URL + url, postData, this.httpOptions)
      .pipe(
        tap((response: Response) => {
          return response;
        }),
        catchError((serverError: Response) => {
          this._errorHandler(serverError)
          return throwError(serverError)
        })
      );
  }

  private _errorHandler(error: any): void {
    this._ms.messageHandler(error);
  }
}