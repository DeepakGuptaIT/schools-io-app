import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const addCount = createAction('[Counter Component] AddCount',
    props<{ count: number }>()
);
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');