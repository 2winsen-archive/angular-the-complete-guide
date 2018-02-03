import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Configs } from './../configs';
import { Recipe } from './../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  storeRecipes(recipes: Recipe[]): Observable<any> {
    return this.httpClient.request(
      new HttpRequest('PUT', `${Configs.FIREBASE_URL}/recipes.json`, recipes, { reportProgress: true })
    );
  }

}
