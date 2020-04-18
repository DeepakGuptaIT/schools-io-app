import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  INIT
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromNote from "./note.reducer";
import * as fromCounter from './counter.reducer';
import * as fromData from "./data.reducer";
import * as fromUser from "./user.reducer";

export interface AppState {
  notes: fromNote.NoteState,
  count: fromCounter.CountState,
  data: fromData.DataState
  user: fromUser.UserState

}

export const reducers: ActionReducerMap<AppState> = {
  notes: fromNote.noteReducer,
  count: fromCounter.counterReducer,
  data: fromData.dataReducer,
  user: fromUser.userReducer

};

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('%cstate', 'color: blue', state);
    console.log('%caction', 'color: orange', action);
    const nextState = reducer(state, action);
    console.log('%cnextState', 'color: green', state);
    if (action.type == INIT) {
      //called on page reload 
      console.log('INIT Action');
    }
    return nextState;
  };
}

/**
 * https://ngrx.io/guide/store/metareducers
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['count', 'data', 'user'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [localStorageSyncReducer] : [];


///////////////////////////// SELECTORS START /////////////////////////////////////////
///////////////////////////// COUNT /////////////////////////////////////////
/**
 * @description this returns the big count object/state from AppState
 * @param state 
 */
export const getCountState = (state: AppState) => state.count;
/**
 * first it extract the count state . than apply the getCount to get all counts
 * getCount and other functions will come from reducer
 */
export const getAllCount = createSelector(
  getCountState,
  fromCounter.getCount
)
///////////// DATA /////////////////
export const getDataState = (state: AppState) => state.data;
export const getAllItems = createSelector(
  getDataState,
  fromData.getItems
);
export const getData = createSelector(
  getDataState,
  fromData.getData
);

///////////// USER ////////////
export const getUserState = (state: AppState) => state.user;
export const getTheme = createSelector(
  getUserState,
  fromUser.getTheme

)
