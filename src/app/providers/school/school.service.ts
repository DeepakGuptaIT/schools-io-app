import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { School } from './../../interfaces/school';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  baseUrl = environment.apiBaseUrl;//environment.apiBaseUrl;
  schools: School[];

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

  getSchoolList(): Observable<any> {
    let url = `${this.baseUrl}/school/`;
    if (this.schools) {
      return of(this.schools);
    } else {
      return this.http
        .get('assets/data/schools.json');
    }
  }

  getSchoolList2(): Observable<any> {
    let url = `${this.baseUrl}/schoolApi/`;
    return this.http.get(url)
      .pipe(
        map(this.processData),
        catchError(this.handleError)
      );
  }

  processData(data: any) {
    const raw: object = data.data;
    let schoolList: any[] = [];
    for (const key in raw) {
      let school = raw[key];
      school._id = key;
      schoolList.push(school);
    }
    return schoolList;
  }

  addSchool(school: School): Observable<any> {
    let url = `${this.baseUrl}/schoolApi/`;
    return this.http.post(url, school)
      .pipe(
        map(this.processAddResponse),
        map(data => {
          const res = { ...school };
          res._id = data;
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
    "message": "The School  is added successfully",
    "statusCode": 200,
    "data": "https://schools-io-d0066.firebaseio.com/schools/-M-Ghvyi9I13R-Bz66CE"
    }
   */
  processAddResponse(data: any) {
    const raw: string = data.data;
    const id = raw.substring(raw.lastIndexOf('/') + 1)
    return id;
  }
  // will not receive data key in res
  updateSchool(id: String, school: School): Observable<any> {
    let url = `${this.baseUrl}/schoolApi/id/${id}`;
    return this.http.put(url, school)
      .pipe(
        catchError(this.handleError)
      );
  }
  // will not receive data key in res
  deleteSchool(id: String): Observable<any> {
    let url = `${this.baseUrl}/schoolApi/id/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  helloFunction(id: String): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let url = `http://localhost:5000/schools-io-d0066/us-central1/helloWorld`;
    url = "https://us-central1-schools-io-d0066.cloudfunctions.net/api/v1/hello";
    url = "https://us-central1-schools-io-d0066.cloudfunctions.net/helloWorld";
    url = `${this.baseUrl}/helloWorld`;
    return this.http.get(url, {
      responseType: "text"
    });
  }



}
