import { Component, OnInit, Input } from '@angular/core';
import { SubjectDocument } from './../../interfaces/models/SubjectModel';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  private _name = '';
  private _id = '';
  color: string;
  isSubject: boolean = false;
  private subject: SubjectDocument;
  private _type: string;
  routerLink: string;
  @Input()
  data: any;

  @Input()
  additionalProps: object;

  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }

  get name(): string { return this._name; }

  @Input()
  set id(id: string) {
    this._id = (id && id.trim()) || '<no name set>';
  }

  get id(): string { return this._id; }

  @Input()
  set type(type: string) {
    this._type = (type && type.trim().toUpperCase()) || '<no name set>';
  }

  get type(): string { return this._type; }

  constructor() { }

  ngOnInit() {
    console.log(this.name);
    if (this.type) {
      switch (this.type) {
        case "SUBJECT":
          if (this.data) {
            this.isSubject = true;
            this.routerLink = `/app/tabs/home/subject-detail/${this.id}`;
            this.subject = this.data;
            this.color = (this.subject.properties && this.subject.properties.color) || 'primary'
          }
      }

    }

  }

}
