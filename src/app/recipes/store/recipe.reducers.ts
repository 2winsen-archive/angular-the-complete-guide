import { Ingredient } from '../../shared/ingredient.model';
import * as fromApp from './../../store/app.reducers';
import { Recipe } from './../recipe.model';
import * as RecipeActions from './recipe.action';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
  error: string;
  success: string;
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Milanesa.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Lemon', 1)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/NYC-Diner-Bacon-Cheeseburger.jpg/1024px-NYC-Diner-Bacon-Cheeseburger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ],
  error: null,
  success: null
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions): State {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...(<RecipeActions.SetRecipes>action).payload],
        error: null,
        success: null
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, (<RecipeActions.AddRecipe>action).payload],
        error: null,
        success: null
      };
    case RecipeActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((r, index) => {
          if (index === (<RecipeActions.UpdateRecipe>action).payload.index) {
            return (<RecipeActions.UpdateRecipe>action).payload.updatedRecipe;
          }
          return r;
        }),
        error: null,
        success: null
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((r, index) => {
          return index !== (<RecipeActions.DeleteRecipe>action).payload;
        }),
        error: null,
        success: null
      };
    case RecipeActions.FETCH_RECIPES_ERROR:
      return { ...state, error: 'error', success: null };
    case RecipeActions.FETCH_RECIPES_SUCCESS:
      return { ...state, success: 'success', error: null };
    default:
      return state;
  }
}
