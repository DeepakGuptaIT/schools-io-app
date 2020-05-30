import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { typesscriptSampleCode, cssSampleCode, jsSampleCode, scssSampleCode, javaSampleCode } from './../../constants/CodeExamples';
import { AppConstants } from './../../constants/AppConstants';
import { CommonService } from './../../providers/core/common.service';
import { TopicService } from './../../providers/topic/topic.service';
import { TopicDocument } from './../../interfaces/models/TopicModel';

/**
 * to fix to add styling innerHtml use this link
 * https://stackoverflow.com/questions/44210786/style-not-working-for-innerhtml-in-angular-2-typescript
 * 
 * But, it breaks other component
 * Note : I am not using this concept at all, as It breaks.
 * use pipe in ts file
 * https://stackoverflow.com/questions/35144821/angular-use-pipes-in-services-and-components
 */

@Component({
  selector: 'topic-detail',
  templateUrl: './topic-detail.page.html',
  styleUrls: ['./topic-detail.page.scss']
})
export class TopicDetailPage implements OnInit {
  topic: TopicDocument;
  defaultHref = "/topics";
  topicId: string;
  baseUrl = `/topics/topic-detail/${this.topicId}`;
  intro = `An Alert is a dialog that presents users with information or collects information from the user
        using inputs. An alert
        appears on top of the app's content, and must be manually dismissed by the user before they can resume
        interaction with
        the app. It can also optionally have a <code class="code">header</code>, <code>subHeader</code> and <code>message</code>.`
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
  loading: HTMLIonLoadingElement;
  cssCodeFromDB: string;

  constructor(
    private route: ActivatedRoute,
    public commonService: CommonService,
    private topicService: TopicService
  ) { }

  ngOnInit() {
    this.topicId = this.route.snapshot.paramMap.get('topicId');
    this.baseUrl = `/topics/topic-detail/${this.topicId}`;
  }

  async ionViewDidEnter() {

    this.loading = await this.commonService.presentLoading('Loading Topics..');
    this.topicService.getTopicById(this.topicId).subscribe(
      async (topic: any) => {
        this.topic = topic;
        console.log('topic', this.topic);
        await this.loading.dismiss();
      },
      async (error) => {
        this.commonService.handleApiError(error);
        await this.loading.dismiss();
      }
    );

  }

}
