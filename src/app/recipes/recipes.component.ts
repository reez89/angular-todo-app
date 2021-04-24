import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  // tslint:disable-next-line: max-line-length
  // ora che ho creato il mio service, posso configurare un subscribe, in modo tale che reagisca ad ogni cambiamento, al click della mia ricetta in questo caso.
  ngOnInit(): void {
    this.recipeService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe;
        }
        );
  }

}
