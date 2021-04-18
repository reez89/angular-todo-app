import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  /* @Output() recipeWasSelected = new EventEmitter<Recipe>(); */
  recipes: Recipe[] ;

  constructor(private recipeService: RecipeService) {} //come per gli esercizi in precedenza, ora per utilizzare il service, devo crearmi il costruttore.

  //a questo punto, nell'ngOnInit, mi richiamo l'array delle ricette, creato nel
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }


  /* onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  } */
}

