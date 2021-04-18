import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingridient } from '../shared/ingridients.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingridients: Ingridient[];
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(){
    this.ingridients = this.shoppingListService.getIingridients();
    this.shoppingListService.ingridientsChange
      .subscribe(
        (ingridients: Ingridient[])=> {
        this.ingridients = ingridients;
       }
      );
  }
}
