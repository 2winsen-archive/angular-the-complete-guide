import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') shoppingListForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  onAddItem() {
    const name = this.shoppingListForm.value.name;
    const amount = this.shoppingListForm.value.amount;
    this.shoppingListService.addIngredient(new Ingredient(name, amount));
  }

  onClear() {
    this.shoppingListForm.reset();
  }

  onDelete() {
    const value = this.shoppingListForm.value;
    this.shoppingListService.deleteIngredient(new Ingredient(value.name, value.amount));
  }
}
