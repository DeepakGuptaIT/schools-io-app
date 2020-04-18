import { Component, OnInit, ViewChild } from '@angular/core';
import { typesscriptSampleCode, cssSampleCode, jsSampleCode, scssSampleCode, javaSampleCode } from './../../constants/CodeExamples';
import { AppConstants } from './../../constants/AppConstants';
import { IonContent } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './../../reducers/index';


@Component({
  selector: 'code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  cssLang: string[] = AppConstants.cssLang;
  javaLang: string[] = AppConstants.javaLang;
  tsLang: string[] = AppConstants.tsLang;
  jsLang: string[] = AppConstants.jsLang;
  showLineNumbers: boolean = false;
  typesscriptSampleCode = typesscriptSampleCode;
  cssSampleCode = cssSampleCode;
  jsSampleCode = jsSampleCode;
  scssSampleCode = scssSampleCode;
  javaSampleCode = javaSampleCode;
  content: string = `If you go directly to the StackBlitz online development environment and choose to start a new Angular workspace, you get a generic stub application, rather than this illustrative sample. Once you have been introduced to the basic concepts here, this can be helpful for working interactively while you are learning Angular.

In actual development you will typically use the Angular CLI, a powerful command-line tool that lets you generate and modify applications. For more information, see the CLI Overview.`;
  count$: Observable<number>;
  constructor(private store: Store<fromRoot.AppState>) {
    this.count$ = store.pipe(select(fromRoot.getAllCount));
  }

  ngOnInit() {
    // new WOW().init();
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    // const tag = document.createElement('script');

    // tag.src = "https://www.youtube.com/iframe_api";
    // document.body.appendChild(tag);
    // this.count$ = this.store.pipe(select('count'));
  }
  getContent() {
    return document.querySelector('ion-content');
  }
  scrollToBottom() {
    this.ionContent.scrollToBottom(500);
  }
  scrollToTop() {
    this.ionContent.scrollToTop(500);
  }

}
