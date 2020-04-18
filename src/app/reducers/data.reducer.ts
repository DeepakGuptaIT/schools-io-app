import { createReducer, on, createSelector } from '@ngrx/store';
import * as fromData from "../actions/data.actions";

export interface DataState {
    items: string[];
    loading: boolean;
    error: any;
}
export const initialState: DataState = {
    items: [],
    loading: false,
    error: null
};

const _dataReducer = createReducer(initialState,
    on(fromData.LoadDataBegin,
        state => ({
            ...state,
            loading: true,
            error: null
        })),
    on(fromData.LoadDataSuccess,
        (state, { data }) => ({
            ...state,
            loading: false,
            items: data
        })),
    on(fromData.LoadDataFailure,
        (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        })),


);

export function dataReducer(state, action) {
    return _dataReducer(state, action);
}
///// SELECTORS /////
// export const getCount = (state: DataState) => state.count;
export const getItems = (state: DataState) => state.items;
export const getData = (state: DataState) => state;

