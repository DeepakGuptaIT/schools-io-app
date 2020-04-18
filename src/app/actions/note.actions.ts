import { createAction, props } from '@ngrx/store';

export interface Note {
    title: string;
}
export const createNote = createAction('[Notes Service] Create note',
    props<{ note: Note }>()
);
export const deleteNote = createAction('[Notes Service] Delete note',
    props<{ note: Note }>()
);
