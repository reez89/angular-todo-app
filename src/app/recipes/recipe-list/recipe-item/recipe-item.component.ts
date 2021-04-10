import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Recipe } from '../../recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() item: Recipe; // questo item fa riferimento alla classe che abbiamo dichiarato in recipeListComponent, e quindi sarà riutilizzat nell'ngFor per visualizzare i dati.
  @Output() recipeSelected = new EventEmitter<void>(); // void perchè non contiene nessuna informazione
  constructor() { }

  ngOnInit(): void {
  }
  onSelected(){
    this.recipeSelected.emit();
  }
}
