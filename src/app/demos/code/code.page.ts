import { Component, OnInit } from '@angular/core';
import { typesscriptSampleCode, cssSampleCode, jsSampleCode, scssSampleCode, javaSampleCode } from './../../constants/CodeExamples';
import { AppConstants } from './../../constants/AppConstants'

@Component({
  selector: 'code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
