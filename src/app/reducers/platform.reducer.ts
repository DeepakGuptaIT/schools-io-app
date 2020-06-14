import { createReducer, on, createSelector } from '@ngrx/store';
import * as PlatformActions from '../actions/platform.actions';
import * as fromRoot from './index';
import { state } from '@angular/animations';


export const initialState: PlatformActions.Platform = {
    viewport: PlatformActions.Viewport.LG
};
const _platformReducer = createReducer(initialState,
    on(PlatformActions.resize, (state, { viewport }) => ({ ...state, viewport: viewport })),
    on(PlatformActions.updatePlatform, (state, { platform }) => ({ ...state, ...platform }))
)

export function platformReducer(state, action) {
    return _platformReducer(state, action);
}

///// SELECTORS /////
export const getViewport = (state: PlatformActions.Platform) => state.viewport;
