import { Recipe } from "./recipe.model";

export class RecipeService {
  private recipes : Recipe[] = [
    new Recipe('Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Test Recipe2', 'This is simply a test2', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ]

  getRecipes() {
    return this.recipes; //.slice()
  }
}