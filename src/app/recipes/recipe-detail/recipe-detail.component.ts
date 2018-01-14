import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  private recipeIndex: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.recipeIndex = +p['id'];
      this.recipe = this.recipeService.getRecipe(this.recipeIndex);
      if (!this.recipe.name) {
        this.router.navigate(['/']);
      }
    });
  }

  onAddToShoppingList() {
    this.recipeService.toShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['/recipes']);
  }
}
