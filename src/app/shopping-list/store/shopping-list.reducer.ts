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
    case ShoppingListActions.UPDATE_INGRIDIENT:
      const ingridient = state.ingridients[action.payload.index];
      const updateIngridient = {
        ...ingridient,
        ...action.payload.ingridient
      };
      const updateIngridients = [...state.ingridients];
      updateIngridients[action.payload.index] = updateIngridient;
      return {
        ...state,
        ingridients: updateIngridients
      };
    case ShoppingListActions.DELETE_INGRIDIENT:
      return {
        ...state,
        ingridients: state.ingridients.filter((ig, igIndex) =>{
          return igIndex !== action.payload;
        })
        }
    default:
      return state;
  }
}
