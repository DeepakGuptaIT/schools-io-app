import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROOT_EFFECTS_INIT, OnInitEffects } from '@ngrx/effects';
import { EMPTY, of, Observable, defer } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { DataService } from '../providers/data.service';
import * as DataActions from './../actions/data.actions';
import * as CountActions from './../actions/counter.actions';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataEffects {
    // actions$: Actions;
    constructor(
        private actions: Actions,
        private dataService: DataService,
        public storage: Storage,
    ) { }

    loadData = createEffect(() => this.actions.pipe(
        ofType(DataActions.LoadDataBegin),
        switchMap(() => {
            return this.dataService.loadData().pipe(
                map(data => DataActions.LoadDataSuccess({ data })),
                catchError(error =>
                    of(DataActions.LoadDataFailure({ error }))
                )
            );
        })
    ));

    // below codes are just backup and not in use

    /* loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType('[Subject Service] Load subject'),
        mergeMap(() => this.SubjectService.getSubjectList2()
            .pipe(
                map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
                catchError(() => EMPTY)
            )

        )
    )
    ); */
    /**
 * returns a promise that waits `ms` milliseconds and emits "done"
 */
    //not in use
    promiseDelay = (ms) => {
        return new Promise(resolve => {
            setTimeout(() => resolve('done'), ms);
        });
    }
    /**
     * this can be used to perform some action on effect initialize
     * NOT IN USE
     *  */
    /* onRootEffectInit = createEffect(() => this.actions.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => {
            // console.log('ROOT_EFFECTS_INIT');
            return defer(async () => {
                // const a = await this.promiseDelay(1000).then(() => 1);
                // const b = a + await this.promiseDelay(1000).then(() => 2);
                // return a + b + await this.promiseDelay(1000).then(() => 3);
                const count = await this.storage.get('count');
                return count;
            }).pipe(
                // map(count => CountActions.addCount({ count })),
            )
        })
    )); */


}