import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataEffects } from "./data.effects";

export const effects: any[] = [DataEffects];
@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) { }
}
