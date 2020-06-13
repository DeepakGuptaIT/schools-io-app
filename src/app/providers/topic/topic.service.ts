import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { environment } from './../../../environments/environment';
import { CommonService } from './../core/common.service'
import { error } from 'protractor';
import { TopicDocument } from './../../interfaces/models/TopicModel'
import { Quiz, QuizJson, QuestionJson, Question, Answer } from '../../interfaces/quiz';

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
   * Take quiz json sample from -
   * https://raw.githubusercontent.com/googlearchive/android-Quiz/master/Application/src/main/assets/Quiz.json
   * 
   */
  getQuiz(): Observable<Quiz> {

    return this.http.get('assets/data/quiz-js.json')
      .pipe(map(this.processQuizData, this));;
  }

  /**
   * prepare data as done by jsmony -
   * https://www.joshmorony.com/create-a-data-driven-quiz-app-in-ionic-2-part-2/
   * @param quiz 
   */
  processQuizData(quiz: QuizJson): Quiz {
    //do processing if required.
    // we can have additional info in the json along with questions . For clarity see the json
    if (!quiz) {
      return { questions: [] };
    }
    const response: Quiz = {
      questions: [],
      hasNegativeMarking: quiz.hasNegativeMarking ? quiz.hasNegativeMarking : false,
      hasWeight: quiz.hasWeight ? quiz.hasWeight : false
    }
    const questionList = quiz.questions;
    questionList.forEach((quesJson: QuestionJson, i) => {
      // response.questions.push(ques);
      let ques: Question = {
        id: i,
        questionText: quesJson.questionText,
        answers: [],
        correctIndex: quesJson.correctIndex,
        scored: 0,
        hasAnswered: false,
        wt: quesJson.wt
      };
      quesJson.answers.forEach((answeStr, j) => {
        let a: any = {
          answer: answeStr,
          selected: false,
          correct: false
        };
        if (quesJson.correctIndex === j) {
          a.correct = true;
        }
        // in case of multiple answers
        if (quesJson.multipleAnswers && Array.isArray(quesJson.correctIndex) && quesJson.correctIndex.includes(j)) {
          a.correct = true;
        }

        ques.answers[j] = a;

      })
      response.questions.push(ques);
    })

    return response;

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
