import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { EmptyRecipeDetailComponent } from './empty-recipe-detail/empty-recipe-detail.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';

const recipesRoutes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: EmptyRecipeDetailComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {

}