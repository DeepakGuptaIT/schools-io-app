import { createAction, props } from '@ngrx/store';

export const LoadDataBegin = createAction(
    "[Data] Load data begin"
);
export const LoadDataSuccess = createAction(
    '[Data] Load data success',
    props<{ data: any }>()

);
export const LoadDataFailure = createAction(
    '[Data] Load data failure',
    props<{ error: any }>()
);
