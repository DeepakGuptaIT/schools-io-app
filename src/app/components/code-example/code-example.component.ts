import { Component, OnInit, Input } from '@angular/core';
import { HighlightResult, HighlightConfig } from 'ngx-highlightjs';
import { Logger } from './../../providers/core/logger.service';
import { CopierService } from './../../providers/core/copier.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'code-example',
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss'],
})
export class CodeExampleComponent implements OnInit {
  //disabled as pre element is taking extra margin on top and bottom
  useCustomCode: boolean = false

  @Input()
  isCenter: boolean = false;

  _code: string;

  @Input()
  heading: string;

  @Input()
  languageList: string[] = null;
  response: HighlightResult;

  @Input()
  showLineNumbers: boolean = false;
  highlightConfig: HighlightConfig;


  get code(): string { return this._code; }
  @Input()
  set code(code: string) {
    this._code = code;
  }

  constructor(
    private copier: CopierService,
    private logger: Logger,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    if (!this.code)
      this.code = '';
    // console.log('languageList', this.languageList)
  }
  onHighlight(e: any) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
    // console.log('code type details', this.response);
  }

  async doCopy() {
    const code = this.code;
    const successfullyCopied = this.copier.copyText(code);
    let copyMessage = "";
    if (successfullyCopied) {
      this.logger.log('Copied code to clipboard:', code);
      copyMessage = 'Code Copied';
      // this.snackbar.open('Code Copied', '', { duration: 800 });
    } else {
      this.logger.error(new Error(`ERROR copying code to clipboard: "${code}"`));
      // this.snackbar.open('Copy failed. Please try again!', '', { duration: 800 });
      copyMessage = 'Copy failed. Please try again!';
    }
    const toast = await this.toastController.create({
      message: copyMessage,
      duration: 800,
      position: 'bottom'
    });
    await toast.present();
  }

}
