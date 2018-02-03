import 'rxjs/add/operator/do';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RecipeService } from '../../recipes/recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';
import * as AuthActions from './../../auth/store/auth.actions';
import * as fromAuth from './../../auth/store/auth.reducers';
import * as RecipeActions from './../../recipes/store/recipe.action';
import * as fromRecipe from './../../recipes/store/recipe.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  status = '';
  authState$: Observable<fromAuth.State>;
  private subscriptions: Subscription[];

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>,
  ) { }

  ngOnInit() {
    this.authState$ = this.store.select('auth');
    this.store.select('recipes')
      .filter((state: fromRecipe.State) => !!state)
      .do((state: fromRecipe.State) => {
        if (state.success) {
          this.success();
        } else if (state.error) {
          this.error();
        }
      })
      .subscribe();
  }

  private success() {
    this.status = 'SUCCESS';
    this.hideStatus();
  }

  private error() {
    this.status = 'ERROR';
    this.hideStatus();
  }

  private hideStatus() {
    setTimeout(() => this.status = '', 2000);
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.TryLogout());
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }
}
