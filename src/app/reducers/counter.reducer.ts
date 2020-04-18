import { createReducer, on, createSelector } from '@ngrx/store';
import { increment, decrement, reset, addCount } from './../actions/counter.actions';
import * as fromRoot from './index';
import { state } from '@angular/animations';

export interface CountState {
    count: number;
}
export const initialState: CountState = {
    count: 0
};

const _counterReducer = createReducer(initialState,
    on(increment, state => ({ ...state, count: state.count + 1 })),
    on(decrement, state => ({ ...state, count: state.count - 1 })),
    on(reset, state => ({ ...state, count: 0 })),
    on(addCount, (state, { count }) => ({ ...state, count: state.count + count }))
);

export function counterReducer(state, action) {
    return _counterReducer(state, action);
}
///// SELECTORS /////
export const getCount = (state: CountState) => state.count;
