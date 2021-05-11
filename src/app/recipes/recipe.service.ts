import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ingridient } from '../shared/ingridients.model';

import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();
/*  private recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'This is simply a test',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563',
      [
        new Ingridient('Meat', 1),
        new Ingridient('Gnocchi', 100)
      ]
    ),
    new Recipe(
      'Another test Recipe',
      'This is another simple test with angular',
      'https://www.inspiredtaste.net/wp-content/uploads/2019/07/Crispy-Falafel-Recipe-2-1200.jpg',
      [
        new Ingridient('Salad', 100),
        new Ingridient('Falafel', 150),
        new Ingridient('Bread', 50)
      ]
    ),
  ]; */
  private recipes: Recipe[] = [];

constructor(
  private store: Store<fromApp.AppState>){}

  // tslint:disable-next-line: typedef
  getRecipes() {
    return this.recipes.slice();
    // ritorna un nuovo array identico all'originale.
  }

  // tslint:disable-next-line: typedef
  getRecipe(index: number){
    return this.recipes[index];
  }

  // tslint:disable-next-line: typedef
  addIngridientsToShippingList(ingridients: Ingridient[]){
    this.store.dispatch(new ShoppingListActions.AddIngridients(ingridients));
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number ){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
