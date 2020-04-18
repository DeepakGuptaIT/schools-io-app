import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/counter.actions';
import { createNote, deleteNote, Note } from '../actions/note.actions';
import * as fromRoot from './index';

export interface NoteState {
    data: Note[];
}
export const initialState: NoteState = {
    data: []
};

/* const _counterReducer = createReducer(initialState,
    on(increment, state => state + 1),
    on(decrement, state => state - 1),
    on(reset, state => 0),
); */
const _noteReducer = createReducer(initialState,
    on(createNote, (state, { note }) => ({ ...state, data: [...state.data, note] })),
    on(deleteNote, (state, { note }) => ({ ...state, ...state.data.splice(state.data.indexOf(note), 1) })),
);


export function noteReducer(state, action) {
    return _noteReducer(state, action);
}