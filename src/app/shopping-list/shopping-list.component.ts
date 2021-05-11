import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingridient } from '../shared/ingridients.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListAction from './store/shopping-list.action';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Observable<{ ingridients: Ingridient[] }>;
  private subscription: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>,
  ) {}

  ngOnInit(){
    this.ingridients = this.store.select('shoppingList');
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
    this.store.dispatch( new ShoppingListAction.StartEdit(index));
  }
  ngOnDestroy(){

  }
}
