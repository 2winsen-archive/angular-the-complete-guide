import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  status = '';

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
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
    this.dataStorageService.storeRecipes(this.recipeService.getRecipes())
      .subscribe(() => this.success(), (error) => {
        console.log(error);
        this.error();
      });
  }

  onFetchData() {
    this.dataStorageService.getRecipes()
      .do((recipes: Recipe[]) => this.recipeService.setRecipes(recipes))
      .subscribe(() => this.success(), (error) => {
        console.log(error);
        this.error();
      });
  }

  onLogout() {
    this.authService.logout();
  }

}
