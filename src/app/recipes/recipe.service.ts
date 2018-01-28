import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty schnitze - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Milanesa.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Lemon', 1)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/NYC-Diner-Bacon-Cheeseburger.jpg/1024px-NYC-Diner-Bacon-Cheeseburger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ];
  constructor() { }

  getRecipe(index: number) {
    return { ...this.recipes[index] };
  }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe.slice();
    this.changed();
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.changed();
  }

  private changed() {
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.changed();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.changed();
  }
}
