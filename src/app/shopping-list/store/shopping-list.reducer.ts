import { Action } from '@ngrx/store';
import { Ingridient } from './../../shared/ingridients.model';

import * as ShoppingListActions from './shopping-list.action';

const initialState = {
  ingridients: [
    new Ingridient('Apples', 10),
    new Ingridient('Tomatoes', 5),
  ]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
  ) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGRIDIENT:
      return {
        ...state,
        ingridients: [...state.ingridients, action.payload]
      };
    case ShoppingListActions.ADD_INGRIDIENTS:
      return {
        ...state,
        ingridients: [...state.ingridients, ...action.payload]
      };
    default:
      return state;
  }
}
