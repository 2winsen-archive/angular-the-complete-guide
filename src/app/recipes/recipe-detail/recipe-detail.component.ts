import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import * as RecipeActions from './../store/recipe.action';
import * as fromRecipe from './../store/recipe.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeIndex: number;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id'];
      this.store.select('recipes')
        .first()
        .do((recipeState: fromRecipe.State) => {
          this.recipe = recipeState.recipes[this.recipeIndex];
        })
        .do(() => {
          if (!this.recipe || !this.recipe.name) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        })
        .subscribe();
    });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipeIndex));
    this.router.navigate(['/recipes']);
  }
}
