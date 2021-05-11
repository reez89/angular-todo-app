import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingridient } from '../../shared/ingridients.model';
import { ShoppingListService } from '../shopping-list.service';

import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm : NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingridient;
  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngridientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngridient;
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }else{
        this.editMode = false;
      }
    });
    /* this.subscription =  this.shoppingListService.startedEditing
        .subscribe((index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngridient(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }); */
  }

  // tslint:disable-next-line: typedef
  onAddItem(form: NgForm){
    const value = form.value;
    const newIngridient = new Ingridient(value.name, value.amount );
    if (this.editMode){
      /* this.shoppingListService.updateIngridient(this.editedItemIndex, newIngridient); */
      this.store.dispatch(new ShoppingListActions.UpdateIngridients(newIngridient)
        );
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngridient(newIngridient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(index: number){
    this.store.dispatch(new ShoppingListActions.DeleteIngridients());
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
