import { Component, OnInit } from '@angular/core';
import { TopicService } from './../../providers/topic/topic.service';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../providers/core/common.service';


interface Topic {
  id: number,
  title: string,
  detail: string,
  icon: string
}

@Component({
  selector: 'topic-list',
  templateUrl: './topic-list.page.html',
  styleUrls: ['./topic-list.page.scss'],
})
export class TopicListPage implements OnInit {

  loading: HTMLIonLoadingElement;

  topicList: Topic[] = [
    {
      id: 1,
      title: 'Button',
      detail: "Buttons let your users take action. They're an essential way to interact with and navigate through an app.",
      icon: 'assets/img/component-icons/component-button-icon.png'
    },
    {
      id: 2,
      title: 'Alert',
      detail: `Alerts are a great way to offer the user the ability to choose a specific action or list
                of actions.`,
      icon: 'assets/img/component-icons/component-alert-icon.png'
    },
    {
      id: 3,
      title: 'Card',
      detail: `Cards are a great way to display an important piece of content, and can contain images, buttons, text, and more.`,
      icon: 'assets/img/component-icons/component-card-icon.png'
    },
    {
      id: 4,
      title: 'Card',
      detail: `Cards are a great way to display an important piece of content, and can contain images, buttons, text, and more.`,
      icon: 'assets/img/component-icons/component-card-icon.png'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    public loadingCtrl: LoadingController,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    this.topicList = []
  }

  async ionViewDidEnter() {

    this.loading = await this.commonService.presentLoading('Loading Topics..');
    this.topicService.getTopicList().subscribe(
      async (topicList: any[]) => {
        this.topicList = topicList;
        console.log('topicList', this.topicList);
        await this.loading.dismiss();
      },
      async (error) => {
        this.commonService.handleApiError(error);
        await this.loading.dismiss();
      }
    );

  }

}
