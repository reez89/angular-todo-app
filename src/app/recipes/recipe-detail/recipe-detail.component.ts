import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// tslint:disable-next-line: import-spacing
import { Recipe } from  '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* const id = this.route.snapshot.params['id']; */ // funziona solo la prima volta che carichiamo la pagina.

    this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params.id;
            this.recipe = this.recipeService.getRecipe(this.id);
          }
        );
  }

  // tslint:disable-next-line: typedef
  addToShippingList(){
    this.recipeService.addIngridientsToShippingList(this.recipe.ingridients);
  }
}
