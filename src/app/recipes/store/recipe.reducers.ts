import { Ingredient } from '../../shared/ingredient.model';
import * as fromApp from './../../store/app.reducers';
import { Recipe } from './../recipe.model';
import * as RecipeActions from './recipe.action';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty schnitze - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Milanesa.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Lemon', 1)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/NYC-Diner-Bacon-Cheeseburger.jpg/1024px-NYC-Diner-Bacon-Cheeseburger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions): State {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...(<RecipeActions.SetRecipes>action).payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, (<RecipeActions.AddRecipe>action).payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((r, index) => {
          if (index === (<RecipeActions.UpdateRecipe>action).payload.index) {
            return (<RecipeActions.UpdateRecipe>action).payload.updatedRecipe;
          }
          return r;
        })
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((r, index) => {
          return index !== (<RecipeActions.DeleteRecipe>action).payload;
        })
      };
    default:
      return state;
  }
}
