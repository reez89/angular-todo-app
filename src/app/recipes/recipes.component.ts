import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],

})
export class RecipesComponent implements OnInit {
  constructor() { }

  // tslint:disable-next-line: max-line-length
  // ora che ho creato il mio service, posso configurare un subscribe, in modo tale che reagisca ad ogni cambiamento, al click della mia ricetta in questo caso.
  ngOnInit(): void {}

}
