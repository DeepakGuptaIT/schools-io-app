import { Component, OnInit } from '@angular/core';

interface Topic {
  title: string,
  detail: string,
  icon: string
}

@Component({
  selector: 'image-hover',
  templateUrl: './image-hover.page.html',
  styleUrls: ['./image-hover.page.scss'],
})
export class ImageHoverPage implements OnInit {
  topicList: Topic[] = [
    {
      title: 'Button',
      detail: "Buttons let your users take action. They're an essential way to interact with and navigate through an app.",
      icon: 'assets/img/component-icons/component-button-icon.png'
    },
    {
      title: 'Alert',
      detail: `Alerts are a great way to offer the user the ability to choose a specific action or list
                of actions.`,
      icon: 'assets/img/component-icons/component-alert-icon.png'
    },
    {
      title: 'Card',
      detail: `Cards are a great way to display an important piece of content, and can contain images, buttons, text, and more.`,
      icon: 'assets/img/component-icons/component-card-icon.png'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
