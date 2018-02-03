import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const STORE_RECIPES = 'STORE_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_RECIPES_ERROR = 'FETCH_RECIPES_ERROR';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) { }
}

export class AddRecipe implements Action {
  readonly type: string = ADD_RECIPE;
  constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
  readonly type: string = UPDATE_RECIPE;
  constructor(public payload: { index: number, updatedRecipe: Recipe }) { }
}

export class DeleteRecipe implements Action {
  readonly type: string = DELETE_RECIPE;
  constructor(public payload: number) { }
}

export class StoreRecipes implements Action {
  readonly type: string = STORE_RECIPES;
}

export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
}

export class FetchRecipesError implements Action {
  readonly type: string = FETCH_RECIPES_ERROR;
}

export class FetchRecipesSuccess implements Action {
  readonly type: string = FETCH_RECIPES_SUCCESS;
}

export type RecipeActions = SetRecipes |
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe |
  StoreRecipes |
  FetchRecipes |
  FetchRecipesError |
  FetchRecipesSuccess;
