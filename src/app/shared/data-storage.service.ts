import { Configs } from './../configs';
import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(
    private http: Http
  ) { }

  storeRecipes(recipes: Recipe[]): Observable<Response> {
    return this.http.put(`${Configs.FIREBASE_URL}/recipes.json`, recipes);
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get(`${Configs.FIREBASE_URL}/recipes.json`)
      .map((response: Response) => response.json())
      .filter((recipes: Recipe[]) => !!recipes)
      .map((recipes: Recipe[]) =>
        recipes
          .reduce((acc, curr) => {
            if (!curr.ingredients) {
              curr.ingredients = [];
            }
            return acc.concat(curr);
          }, [])
      );
  }

}
