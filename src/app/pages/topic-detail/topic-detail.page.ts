import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { typesscriptSampleCode, cssSampleCode, jsSampleCode, scssSampleCode, javaSampleCode } from './../../constants/CodeExamples';
import { AppConstants } from './../../constants/AppConstants';

@Component({
  selector: 'topic-detail',
  templateUrl: './topic-detail.page.html',
  styleUrls: ['./topic-detail.page.scss'],
})
export class TopicDetailPage implements OnInit {
  defaultHref = "/topics";
  topicId: string;
  baseUrl = `/topics/topic-detail/${this.topicId}`;
  //code blocak properties :
  showLineNumbers: boolean = false;
  cssLang: string[] = AppConstants.cssLang;
  javaLang: string[] = AppConstants.javaLang;
  tsLang: string[] = AppConstants.tsLang;
  jsLang: string[] = AppConstants.jsLang;
  cssSampleCode = cssSampleCode;
  jsSampleCode = jsSampleCode;
  scssSampleCode = scssSampleCode;
  javaSampleCode = javaSampleCode;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.topicId = this.route.snapshot.paramMap.get('topicId');
    this.baseUrl = `/topics/topic-detail/${this.topicId}`;
  }

}
