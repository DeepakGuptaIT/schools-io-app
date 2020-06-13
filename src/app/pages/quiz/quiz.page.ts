import { Component, OnInit, ViewChild } from '@angular/core';
// import { Data } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { TopicService } from './../../providers/topic/topic.service';
import { CommonService } from '../../providers/core/common.service';
import { Question, Quiz, Answer, SubmitResponse } from '../../interfaces/quiz';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * urls : 
 * https://www.joshmorony.com/create-a-data-driven-quiz-app-in-ionic-2-part-1/
 */

@Component({
  selector: 'quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  @ViewChild('slides', { static: false }) slides: any;
  loading: HTMLIonLoadingElement;
  //-----------timer variables ------------
  destroy = new Subject();
  timer: number;
  displayTimer: { seconds: number, minute: number, hour: number };
  rxjsTimer = timer(1000, 1000);
  // ------------slide variables-----------
  hidePrev = true;
  hideNext = false;
  slideOptions: any;
  slideOpts = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'progressbar'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick: "true"
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    mousewheel: {
      invert: true,
    }
  };
  // ----------- quiz status and statistics------------
  questionList: Question[];
  quiz: Quiz;
  hasQuizStarted = false;
  hasSubmitted: boolean = false;
  totalScored: number = 0;
  answeredQuestiosCount: number = 0;
  submitResponse: SubmitResponse;



  constructor(public navCtrl: NavController, public topicService: TopicService,
    public commonService: CommonService, private alertController: AlertController) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {

    this.loading = await this.commonService.presentLoading('Loading Topics..');
    this.topicService.getQuiz().subscribe(
      async (quizData: Quiz) => {
        this.quiz = quizData;
        this.processData();

        // this.questionList = quizData.questions;
        console.log('quiz', this.quiz);
        await this.loading.dismiss();
      },
      async (error) => {
        this.commonService.handleApiError(error);
        await this.loading.dismiss();
      }
    );

  }

  trackByFn(index: number, item) {
    // return item.someUniqueIdentifier;
    // or if you have no unique identifier:
    return index;
  }
  // after selecting option
  selectAnswerSingle($event) {
    const question: Question = $event.target.name;//whole ques
    const answerIndex = $event.target.value;//j
    question.hasAnswered = true;
    question.answers.map((a, i) => {
      a.selected = false;
      if (i === answerIndex) {
        a.selected = true;
        question.isCorrect = a.correct;
        question.scored = a.correct ? 1 : 0;
      }
    })
    console.log(question);
    setTimeout(() => this.slideNext(), 1000);
  }
  /**
   * To implement timer, follow below link example
   * https://stackblitz.com/edit/angular-rxjs-timer?file=src%2Fapp%2Fapp.component.ts
   */
  startQuiz() {
    this.displayTimer = {
      seconds: 0,
      minute: 0,
      hour: 0
    }
    this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => {
      this.timer = val;
      this.displayTimer.seconds = val % 60;
      if (this.displayTimer.seconds == 0 && val > 0) {
        this.displayTimer.seconds = 0;
        this.displayTimer.minute += 1;
        if (this.displayTimer.minute === 60) {
          this.displayTimer.minute = 0;
          this.displayTimer.hour += 1
        }
      }
      if (this.displayTimer.minute >= 45) {
        this.destroy.next();
        this.destroy.complete();
        this.submitQuiz();
      }
      this.hasQuizStarted = true;
    })

    // this.slideNext();
  }

  async submitQuiz() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to submit ?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SUBMIT',
          handler: async () => {
            // to hide prev < button
            this.hidePrev = true;
            this.hasSubmitted = true;
            // stop the timer
            this.destroy.next();
            this.destroy.complete();
            // prepare the submitResponse
            console.log('questionList', this.questionList);
            const answeredQuestionList = [];
            const wrongAnsweredList = [];
            const correctAnsweredList = [];
            this.totalScored = 0
            this.questionList.filter(e => e.hasAnswered).forEach((e, i) => {
              answeredQuestionList.push(e);
              if (e.isCorrect) {
                correctAnsweredList.push(e);
                if (this.quiz.hasWeight) {
                  this.totalScored += e.wt ? e.wt : 1;
                } else {
                  this.totalScored += 1;
                }
              } else {
                wrongAnsweredList.push(e);
                //in case of negative marking , we can substract
                if (this.quiz.hasNegativeMarking) {
                  const ngWt = (e.wt ? e.wt : 1) / 4;
                  this.totalScored -= ngWt;
                }
              }

            });
            /* if (answeredQuestionList.length > 0) {
              const wrongAnsweredList = answeredQuestionList.filter(e => !e.isAnswerCorrect);
              const correctAnsweredList = answeredQuestionList.filter(e => e.isAnswerCorrect);
            } */
            // this.answeredQuestiosCount = answeredQuestionList.length;
            /* if (answeredQuestionList.length > 0) {
              this.totalScored = answeredQuestionList.map((i: Question) => i.scored).reduce((a, b) => a + b);
            } */
            const scorePercentage = Math.round((this.totalScored * 100) / this.quiz.totalWt)

            this.submitResponse = {
              correctCount: { value: correctAnsweredList.length },
              wrongCount: {
                value: wrongAnsweredList.length,
                type: "danger"
              },
              totalQ: {
                value: this.quiz.questions.length
              },
              totalWt: {
                value: this.quiz.totalWt
              },
              scoreInPercentage: {
                value: scorePercentage,
                type: scorePercentage < 30 ? 'danger' : (scorePercentage >= 30 && scorePercentage < 60) ? 'warning' : 'success'
              },
              totalAnswered: {
                value: answeredQuestionList.length
              }
            }
            console.log(this.submitResponse)
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 
   * process the json to randamize question and answer both
   * can do other action as well
   */
  processData() {
    const quesList: Question[] = this.quiz.questions;
    let totalWt: number = this.quiz.totalWt;
    if (!this.quiz.hasWeight) {
      totalWt = quesList.length;
    } else {
      totalWt = 0;
    }

    // const totalWt = this.quiz.totalWt ? 
    quesList.map((question) => {
      if (this.quiz.hasWeight) {
        totalWt += question.wt ? question.wt : 1;
      }
      let originalOrder = question.answers;
      question.answers = this.randomizeList(originalOrder);
      return question;
    });
    this.quiz.totalWt = totalWt;
    this.questionList = this.randomizeList(quesList);
  }

  randomizeList<T>(list: T[]): T[] {
    for (let i = list.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    return list;
  }

  onSlideChangeStart(event) {
    let prom1 = this.slides.isBeginning();
    let prom2 = this.slides.isEnd();

    Promise.all([prom1, prom2]).then((data) => {
      data[0] ? this.hidePrev = true : this.hidePrev = false;
      data[1] ? (this.hideNext = true) : this.hideNext = false;
      // this.hasSubmitted = !this.hideNext;
    });
    /* event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
    event.target.isStart().then(isStart => {
      this.showPrev = !isStart;
    }); */
  }
  slideNext() {
    this.slides.slideNext();
  }
  slidePrev() {
    this.slides.slidePrev();
  }

}
