import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'This is simply a test',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563'
    ),
    new Recipe(
      'Another test Recipe',
      'This is another simple test with angular',
      'https://www.inspiredtaste.net/wp-content/uploads/2019/07/Crispy-Falafel-Recipe-2-1200.jpg'
    ),
  ]; // per definire il tipo di array, ed associarlo alla classe , useremo quella forma, e il nome Recipe, non è niente altro che il nome del modello dichiarato precedentemente.

  constructor() {}

  ngOnInit(): void {}


  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}

