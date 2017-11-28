import { Component } from "@angular/core";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.html'],
  providers: [
    RecipeService
  ]
})
export class RecipesComponent {
  activeRecipe: Recipe;
}