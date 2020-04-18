import { createReducer, on, createSelector } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

import * as fromRoot from './index';
import { state } from '@angular/animations';
import { userInfo } from 'os';

export interface UserState {
    user: UserActions.User;
}
export const initialState: UserState = {
    user: {
        isLoggedIn: false,
        preference: {
            darkTheme: false
        }
    }
};

const _userReducer = createReducer(initialState,
    on(UserActions.SetTheme, (state, { darkTheme }) => ({ ...state, user: { ...state.user, preference: { ...state.user.preference, darkTheme: darkTheme } } }))
);

export function userReducer(state, action) {
    return _userReducer(state, action);
}
///// SELECTORS /////
export const getTheme = (state: UserState) => state.user.preference.darkTheme;
