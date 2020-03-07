import { Component, OnInit, Input } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'custom-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {

  _code: string;
  response: HighlightResult;
  get code(): string { return this._code; }
  @Input()
  set code(code: string) {
    this._code = code;
  }

  constructor() { }

  ngOnInit() { }
  onHighlight(e: any) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
    console.log('code type details', this.response);
  }

}
