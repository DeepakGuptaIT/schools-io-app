import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { environment } from './../../../environments/environment';
import { CommonService } from './../core/common.service'
import { error } from 'protractor';
import { TopicDocument } from './../../interfaces/models/TopicModel'

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

  getTopicById(id: String): Observable<any> {
    let url = `${this.baseUrl}/topicApi/id/${id}`;
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
  }

  /**
   * 
   * @param topic 
   * Response Example - 
   * {
    "status": "SUCCESS",
    "message": "The topic  is added successfully",
    "statusCode": 200,
    "data": {
        "id": "button"
    }
}
   */

  addTopic(topic: TopicDocument) {
    try {
      let url = `${this.baseUrl}/topicApi`;
      if (this.commonService.getIsOnline3()) {
        return this.http.post(url, topic)
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

}
