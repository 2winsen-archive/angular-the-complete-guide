import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { HttpClient } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Configs } from '../../configs';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.action';
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipesFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap(() => this.httpClient.get<Recipe[]>(`${Configs.FIREBASE_URL}/recipes.json`)
      .filter((recipes: Recipe[]) => !!recipes)
      .map((recipes) =>
        recipes
          .reduce((acc, curr) => {
            if (!curr.ingredients) {
              curr.ingredients = [];
            }
            return acc.concat(curr);
          }, [])
      )
      .mergeMap((recipes: Recipe[]) => [
        {
          type: RecipeActions.FETCH_RECIPES_SUCCESS
        },
        {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        }
      ])
      .catch((error: Error) => Observable.of({
        type: RecipeActions.FETCH_RECIPES_ERROR,
        payload: error.message
      }))
    );

  @Effect({
    dispatch: false
  })
  recipesStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      return this.httpClient.request(
        new HttpRequest('PUT', `${Configs.FIREBASE_URL}/recipes.json`, state.recipes, { reportProgress: true })
      );
    });

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>
  ) { }

}
