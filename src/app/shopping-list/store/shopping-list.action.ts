import { Action } from '@ngrx/store';
import { Ingridient } from 'src/app/shared/ingridients.model';

export const ADD_INGRIDIENT = 'ADD_INGRIDIENT';
export const ADD_INGRIDIENTS = 'ADD_INGRIDIENTS';

export class AddIngridient implements Action{
  readonly type = ADD_INGRIDIENT;


  constructor( public payload: Ingridient ){}
}


export class AddIngridients implements Action{
  readonly type = ADD_INGRIDIENTS;
  constructor( public payload: Ingridient[] ){}
}

export type ShoppingListActions = AddIngridient | AddIngridients;
