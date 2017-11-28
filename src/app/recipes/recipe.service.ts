import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  private recipes : Recipe[] = [
    new Recipe(
      'Tasty Schnitzel', 
      'A super-tasty schnitze - just awesome!', 
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Milanesa.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Lemon', 1)
      ]
    ),
    new Recipe(
      'Big Fat Burger', 
      'What else you need to say', 
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/NYC-Diner-Bacon-Cheeseburger.jpg/1024px-NYC-Diner-Bacon-Cheeseburger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice()
  }

  toShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}