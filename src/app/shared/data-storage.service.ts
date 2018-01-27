import 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';
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

  storeRecipes(recipes: Recipe[]): Observable<Recipe[]> {
    return Observable.fromPromise(this.authService.getToken())
      .flatMap(
      (token: string) => this.httpClient.put<Recipe[]>(`${Configs.FIREBASE_URL}/recipes.json?auth=${token}`, recipes)
      );
  }

  getRecipes(): Observable<Recipe[]> {
    return Observable.fromPromise(this.authService.getToken())
      .flatMap((token: string) =>
        this.httpClient.get<Recipe[]>(`${Configs.FIREBASE_URL}/recipes.json?auth=${token}`)
          .filter((recipes) => !!recipes)
          .map((recipes) =>
            recipes
              .reduce((acc, curr) => {
                if (!curr.ingredients) {
                  curr.ingredients = [];
                }
                return acc.concat(curr);
              }, [])
          )
      );
  }

}
