import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}


  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http
        .put('https://todo-app-84ca8-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
        .subscribe(resp => {
          console.log(resp);
        });
  }

  fetchRecipes(){
    return this.http
                .get<Recipe[]>('https://todo-app-84ca8-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
                ).pipe(
                  map(resp => {
                  return resp.map(recipe => {
                    return {
                      ...recipe,
                      ingridients: recipe.ingridients ? recipe.ingridients : []
                    };
                  });
                }),
                tap(recipes => {
                  this.recipeService.setRecipes(recipes);
                })
              );
  }
}
