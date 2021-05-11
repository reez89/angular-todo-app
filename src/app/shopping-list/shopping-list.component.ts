import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingridient } from '../shared/ingridients.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
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
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(){
    this.ingridients = this.store.select('shoppingList');
  }

  onEditItem(index: number){
    this.store.dispatch( new ShoppingListAction.StartEdit(index));
  }
  ngOnDestroy(){

  }
}
