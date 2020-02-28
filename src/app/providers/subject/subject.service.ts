import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { SubjectDocument, SubjectProperties } from './../../interfaces/models/SubjectModel';
import { environment } from './../../../environments/environment';
import { CommonService } from './../core/common.service'
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {
  baseUrl = environment.apiBaseUrl;//environment.apiBaseUrl;
  subjects: SubjectDocument[];

  constructor(public http: HttpClient, private commonService: CommonService) { }

  async getSubjectList(): Promise<Observable<any>> {
    try {
      let url = `${this.baseUrl}/subjectApi`;
      if (await this.commonService.getIsOnline()) {
        return this.http.get(url)
          .pipe(
            map(d => {
              const raw: object = (<any>d).data;
              return raw;
            })
          );
      } else {
        return this.commonService.getInternetFailedError();
      }
    } catch (ex) {
      return this.commonService.getUnknownError();
    }
  }

  async getSubjectById(id: String): Promise<Observable<any>> {
    let url = `${this.baseUrl}/subjectApi/id/${id}`;
    return this.http.get(url)
      .pipe(
        map(d => {
          const raw: object = (<any>d).data;
          return raw;
        })
      );
  }

  async addSubject(subject: SubjectDocument): Promise<Observable<any>> {
    let url = `${this.baseUrl}/subjectApi/`;
    return this.http.post(url, subject)
      .pipe(
        map(this.processAddResponse),
        map(data => {
          const res = { ...subject };
          res.id = data;
          return res;
        })
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
  async updateSubject(id: String, subject: SubjectDocument): Promise<Observable<any>> {
    let url = `${this.baseUrl}/subjectApi/id/${id}`;
    return this.http.put(url, subject);
  }
  // will not receive data key in res
  async deleteSubject(id: String): Promise<Observable<any>> {
    let url = `${this.baseUrl}/subjectApi/id/${id}`;
    return this.http.delete(url);
  }

}
