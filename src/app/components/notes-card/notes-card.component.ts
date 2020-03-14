import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';


export interface Props {
  cardColor: string;
  content: string;
  heading?: string;
}

@Component({
  selector: 'notes-card',
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.scss'],
})
/**
 * @Use - To display Additional Note info in any page
 */
export class NotesCardComponent implements OnInit {

  hasContent: boolean = true;
  hasTitle: boolean = true;
  cardClass = "note-with-title-card";
  constructor() { }
  @Input()
  props: Props;

  @Input()
  content: string;

  @Input()
  title: string;

  @Input()
  cardColor: string = "medium";

  ngOnInit() {
    if (_.isEmpty(this.content)) {
      this.hasContent = false;
      this.content = 'Happy Coding !';
    }
    if (_.isEmpty(this.title)) {
      this.hasTitle = false;
      this.cardClass = "note-card";
      this.title = 'Title';
    }
    /* if (_.isEmpty(this.props)) {
      this.content = 'Happy Coding !';

    } else {
      if (_.isEmpty(this.props.content)) {
        this.content = 'Happy Coding !'
      } else {
        this.content = this.props.content;
      }
      if (!_.isEmpty(this.props.cardColor)) {
        this.cardColor = this.props.cardColor;
      }
    } */
  }

}
