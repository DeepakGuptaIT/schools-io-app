import { Component, OnInit } from '@angular/core';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../providers/core/common.service';
import { TopicService } from './../../providers/topic/topic.service';
import { TopicDocument, ContentObj } from './../../interfaces/models/TopicModel';
import { typesscriptSampleCode, cssSampleCode, jsSampleCode, scssSampleCode, javaSampleCode } from './../../constants/CodeExamples';


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
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public commonService: CommonService,
    private topicService: TopicService
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

  async addTopic() {
    const intro: ContentObj[] = [
      {
        value: `An Alert is a dialog that presents users with information or collects information from the user
        using inputs. An alert
        appears on top of the app's content, and must be manually dismissed by the user before they can resume
        interaction with
        the app. It can also optionally have a `
      },
      {
        type: "code",
        value: "header"
      },
      {
        value: ','
      },
      {
        type: "code",
        value: "subHeader"
      },
      {
        value: 'and'
      },
      {
        type: 'code',
        value: 'message'
      }

    ]
    const sample: TopicDocument = {
      id: "alert",
      name: "ion-alert",
      description: `Topic2 are a great way to offer the user the ability to choose a specific action or list of actions.`,
      intro: intro,
      icon: 'assets/img/component-icons/component-alert-icon.png',
      rating: 0,
      properties: {
        color: "green",
        rating: 9,
        size: "Medium",
        isTechnical: true
      },
      contentList: [
        {
          heading: { type: "h3", value: 'Buttons' },
          contentMapList: [
            {
              type: 'p',
              content: [
                {
                  value: `In the array of buttons`
                },
                {
                  type: "code",
                  value: 'buttons'
                },
                {
                  value: ' , each button includes properties for its text, and optionally a handler. If a handler returns false then the alert will not automatically be dismissed when the button is clicked. All buttons will show up in the order they have been added to the buttons array from left to right. Note: The right most button (the last one in the array) is the main button.'
                }
              ]
            },
            {
              type: 'p',
              content: [
                {
                  value: `Optionally, a role property can be added to a button, such as `
                },
                {
                  type: 'code',
                  value: 'cancel'
                },
                {
                  value: '. If a cancel role is on one of the buttons, then if the alert is dismissed by tapping the backdrop, then it will fire the handler from the button with a cancel role.'
                }

              ]
            }

          ]
        },
        {
          heading: { type: "h2", value: 'Usages' },
          contentMapList: [
            {
              type: 'p',
              content: [{
                value: `Uses Content.`
              },
              ]
            },
            {
              type: "code",
              content: [{
                value: typesscriptSampleCode,
                heading: 'index.ts',
                codeType: 'ts'
              }]
            },
            {
              type: 'p',
              content: [{
                value: `Let's look closly to above code.`
              },
              ]
            },
            {
              type: 'note',
              content: [
                {
                  value: 'Hey, Happy Learning . Very good to see you learning ! :)',
                  noteType: 'success'
                },
                {
                  value: 'this is depricated !',
                  noteType: 'danger'
                },
                {
                  value: 'Hey, I am warning you!',
                  noteType: 'warning'
                },
                {
                  value: 'Hey, I am warning you!',
                  noteType: 'warning',
                  heading: 'the warning'
                }
              ]
            },
            {
              type: 'p',
              content: [{
                value: `Did u noticed the warning! :D Now, look at the below css code.`
              },
              ]
            },
            {
              type: "code",
              content: [{
                value: cssSampleCode,
                heading: 'index.scss',
                codeType: 'sass'
              }]
            }
          ]
        }
      ]
    };

    this.topicService.addTopic(sample).subscribe(
      async res => {
        console.log(res);
        const toast = await this.toastCtrl.create({
          message: 'Topic Added successfully',
          position: 'bottom',
          duration: 2000
        });
        await toast.present();
      },
      async error => {
        this.commonService.handleApiError(error);
      }
    )

  }

}
