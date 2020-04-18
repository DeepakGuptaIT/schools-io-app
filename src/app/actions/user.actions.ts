import { createAction, props } from '@ngrx/store';

export interface User {
    isLoggedIn: boolean;
    preference: {
        darkTheme: boolean
    }
}

export const SetTheme = createAction(
    '[User]  Set theme',
    props<{ darkTheme: boolean }>()

);