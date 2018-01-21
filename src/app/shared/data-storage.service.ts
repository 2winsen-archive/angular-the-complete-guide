import { AuthService } from './../auth/auth.service';
import { Configs } from './../configs';
import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(
    private http: Http,
    private authService: AuthService,
  ) { }

  storeRecipes(recipes: Recipe[]): Observable<Response> {
    return Observable.fromPromise(this.authService.getToken())
      .flatMap(
      (token: string) => this.http.put(`${Configs.FIREBASE_URL}/recipes.json?auth=${token}`, recipes)
      );
  }

  getRecipes(): Observable<Recipe[]> {
    return Observable.fromPromise(this.authService.getToken())
      .flatMap((token: string) =>
        this.http.get(`${Configs.FIREBASE_URL}/recipes.json?auth=${token}`)
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
          )
      );
  }

}
