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

  constructor() { }

  ngOnInit() {
  }

}
