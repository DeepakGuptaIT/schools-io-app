import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { environment } from './../../../environments/environment';
import { CommonService } from './../core/common.service'
import { error } from 'protractor';

export interface Topic {
  id: string;
  name: string;
  details: string;

}

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  baseUrl = environment.apiBaseUrl;//environment.apiBaseUrl;


  constructor(public http: HttpClient, private commonService: CommonService) { }

  getTopicList(): Observable<any> {
    try {
      let url = `${this.baseUrl}/topicApi`;
      if (this.commonService.getIsOnline3()) {
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

  async getTopicById(id: String): Promise<Observable<any>> {
    let url = `${this.baseUrl}/topicApi/id/${id}`;
    return this.http.get(url)
      .pipe(
        map(d => {
          const raw: object = (<any>d).data;
          return raw;
        })
      );
  }

}
