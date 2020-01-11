import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { School } from './../../interfaces/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  baseUrl = 'http://localhost:3000';
  schools: School[];

  constructor(public http: HttpClient) { }

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
    let url = `${this.baseUrl}/school/`;
    return this.http.get(url);
  }

  addSchool(school: School): Observable<any> {
    let url = `${this.baseUrl}/school/`;
    return this.http.post(url, school);
  }

  updateSchool(id: String, school: School): Observable<any> {
    let url = `${this.baseUrl}/school/id/${id}`;
    return this.http.put(url, school);
  }

  deleteSchool(id: String): Observable<any> {
    let url = `${this.baseUrl}/school/id/${id}`;
    return this.http.delete(url);
  }

}
