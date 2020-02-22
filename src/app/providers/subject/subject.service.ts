import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { SubjectDocument, SubjectProperties } from './../../interfaces/models/SubjectModel';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {
  baseUrl = environment.apiBaseUrl;//environment.apiBaseUrl;
  subjects: SubjectDocument[];

  constructor(public http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getSubjectList(): Observable<any> {
    let url = `${this.baseUrl}/subjectApi/`;
    return this.http.get(url)
      .pipe(
        map(d => {
          const raw: object = (<any>d).data;
          return raw;
        }),
        catchError(this.handleError)
      );
  }

  getSubjectById(id: String): Observable<any> {
    let url = `${this.baseUrl}/subjectApi/id/${id}`;
    return this.http.get(url)
      .pipe(
        map(d => {
          const raw: object = (<any>d).data;
          return raw;
        }),
        catchError(this.handleError)
      );
  }

  addSubject(subject: SubjectDocument): Observable<any> {
    let url = `${this.baseUrl}/subjectApi/`;
    return this.http.post(url, subject)
      .pipe(
        map(this.processAddResponse),
        map(data => {
          const res = { ...subject };
          res.id = data;
          return res;
        }),
        catchError(this.handleError)
      );
  }
  /**
   * 
   * @param data 
   * {
    "status": "SUCCESS",
    "message": "The SubjectDocument  is added successfully",
    "statusCode": 200,
    "data": "https://subjects-io-d0066.firebaseio.com/subjects/-M-Ghvyi9I13R-Bz66CE"
    }
   */
  processAddResponse(data: any) {
    const raw: string = data.data;
    const id = raw.substring(raw.lastIndexOf('/') + 1)
    return id;
  }

  // will not receive data key in res
  updateSubject(id: String, subject: SubjectDocument): Observable<any> {
    let url = `${this.baseUrl}/subjectApi/id/${id}`;
    return this.http.put(url, subject)
      .pipe(
        catchError(this.handleError)
      );
  }
  // will not receive data key in res
  deleteSubject(id: String): Observable<any> {
    let url = `${this.baseUrl}/subjectApi/id/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

}
