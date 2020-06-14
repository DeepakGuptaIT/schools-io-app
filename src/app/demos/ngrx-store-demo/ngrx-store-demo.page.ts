import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from './../../actions/counter.actions';
import { merge, pick } from 'lodash';
import * as fromCounter from './../../reducers/counter.reducer';
// import { AppState, getAllCount } from './../../reducers/index';
import * as fromRoot from './../../reducers/index';
// import { createNote } from './../../actions/subject.actions';
import { DataService } from "../../providers/data.service";
import * as UserActions from './../../actions/user.actions';
import * as viewportActions from '../../actions/platform.actions';


@Component({
  selector: 'ngrx-store-demo',
  templateUrl: './ngrx-store-demo.page.html',
  styleUrls: ['./ngrx-store-demo.page.scss'],
})
export class NgrxStoreDemoPage implements OnInit {
  count$: Observable<number>;
  size$: Observable<any>;
  platform$: Observable<any>;
  data: any;

  constructor(private store: Store<fromRoot.AppState>, private dataService: DataService) {
    this.count$ = store.pipe(select(fromRoot.getAllCount));
    this.dataService.load();
    this.size$ = store.pipe(select(fromRoot.getViewport))
    this.platform$ = store.pipe(select(fromRoot.getPlatformState))
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
  setTheme() {
    this.store.dispatch(UserActions.SetTheme({ darkTheme: true }));
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      console.log('data list', data);
      this.data = data;
    });
  }

}
