import { Action } from '@ngrx/store';
import { Ingridient } from './../../shared/ingridients.model';

import * as ShoppingListActions from './shopping-list.action';

export interface State{
  ingridients: Ingridient[];
  editedIngridient: Ingridient;
  editedIngridientIndex: number;
}

const initialState: State = {
  ingridients: [
    new Ingridient('Apples', 10),
    new Ingridient('Tomatoes', 5),
  ],
  editedIngridient: null,
  editedIngridientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
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
      const ingridient = state.ingridients[state.editedIngridientIndex];
      const updateIngridient = {
        ...ingridient,
        ...action.payload
      };
      const updateIngridients = [...state.ingridients];
      updateIngridients[state.editedIngridientIndex] = updateIngridient;
      return {
        ...state,
        ingridients: updateIngridients,
        editedIngridientIndex: -1,
        editedIngridient: null
      };
    case ShoppingListActions.DELETE_INGRIDIENT:
      return {
        ...state,
        ingridients: state.ingridients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngridientIndex;
        })
        };
      case ShoppingListActions.START_EDIT:
        return {
          ...state,
          editedIngridientIndex: action.payload,
          editedIngridient: {...state.ingridients[action.payload]}
        };
      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          editedIngridient: null,
          editedIngridientIndex: -1
        };
    default:
      return state;
  }
}
