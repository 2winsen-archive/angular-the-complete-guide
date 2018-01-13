import { Subject } from 'rxjs/Subject';
import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  deleteIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.reduce((acc, curr) => {
      if (curr.name === ingredient.name) {
        if (ingredient.amount < curr.amount) {
          curr.amount -= ingredient.amount;
          acc.push(curr);
        } else {
          ingredient.amount -= curr.amount;
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }
}
