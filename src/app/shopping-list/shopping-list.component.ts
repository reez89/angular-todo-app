import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingridient } from '../shared/ingridients.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Ingridient[];
  private idChange: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(){
    this.ingridients = this.shoppingListService.getIingridients();
    this.idChange = this.shoppingListService.ingridientsChange
      .subscribe(
        (ingridients: Ingridient[])=> {
        this.ingridients = ingridients;
       }
      );
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.idChange.unsubscribe();
  }
}
