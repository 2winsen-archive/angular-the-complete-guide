import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../auth/auth.service';
import { Configs } from './../configs';
import { Recipe } from './../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  storeRecipes(recipes: Recipe[]): Observable<any> {
    return this.httpClient.request(
      new HttpRequest('PUT', `${Configs.FIREBASE_URL}/recipes.json`, recipes, { reportProgress: true })
    );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(`${Configs.FIREBASE_URL}/recipes.json`)
      .filter((recipes) => !!recipes)
      .map((recipes) =>
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
