import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.concat((<ShoppingListActions.AddIngredient>action).payload)
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.concat((<ShoppingListActions.AddIngredients>action).payload)
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients
          .map((ingredient, index) => {
            if ((<ShoppingListActions.UpdateIngredient>action).payload.index) {
              return (<ShoppingListActions.UpdateIngredient>action).payload.newIngredient;
            }
            return ingredient;
          })
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients
          .filter((ingredient, index) => index !== (<ShoppingListActions.DeleteIngredient>action).payload)
      };
    default:
      return state;
  }
}
