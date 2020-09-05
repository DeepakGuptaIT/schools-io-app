import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Logger } from './../../providers/core/logger.service';

/**
 * https://lodash.com/docs/4.17.15
 * 
 * We will also experiment moment library here
 */
@Component({
  selector: 'loadash',
  templateUrl: './loadash.page.html',
  styleUrls: ['./loadash.page.scss'],
})
export class LoadashPage implements OnInit {

  constructor(private log: Logger) { }
  inputArr: any[];
  outputArr: any[];
  inputObj: object;
  outputObj: object;
  segment = 2;
  // moment library
  myDate = _.now();
  nextDay: Date;

  ngOnInit() {
    this.nextDay = new Date();
    this.nextDay.setDate(this.nextDay.getDate() + 1);

  }
  logger(name: string, input: any, output: any) {

    console.log('%c Testing ' + name + ":", 'color: violet; font-weight: bold;');
    console.log('%c Input', 'color: orange; font-weight: bold;', input);
    console.log('%c Output', 'color: green; font-weight: bold;', output);
    console.log('-----------------------------------------------------------');
  }
  /**
   * this function gets called on button click named Chunk.
   * Now, if we put break-point inside function, we can test all other load
   */
  chunk() {
    this.inputArr = ['a', 'b', 'c', 'd'];
    let inputStr = ``
    // console.log('%c Input', 'color: orange; font-weight: bold;', this.inputArr);
    this.outputArr = _.chunk(['a', 'b', 'c', 'd'], 2);
    // => [['a', 'b'], ['c', 'd']]
    // console.log('%c Output', 'color: green; font-weight: bold;', this.outputArr);
    this.logger('chunk', this.inputArr, this.outputArr);


    _.chunk(['a', 'b', 'c', 'd'], 3);
    // => [['a', 'b', 'c'], ['d']]
  }
  segmentChanged(event) {
    console.log(event);

  }


}
