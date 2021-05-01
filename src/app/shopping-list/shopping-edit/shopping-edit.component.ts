import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingridient } from '../../shared/ingridients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
   // con il nuovo metodo ngForm, non mi servono piu' questi riferimenti.
  /* @ViewChild('nameInput', { static : true }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static : true }) amountInputRef: ElementRef; */
  // tslint:disable-next-line: max-line-length
  /* @Output() ingridientAdded = new EventEmitter<Ingridient>(); */ // <{name: string, amount: number}> a questa dichiarazione possiamo sostituire direttamente il file condiviso Ingridient
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onAddItem(form: NgForm){
    const value = form.value;
    const newIngridient = new Ingridient(value.name, value.amount );
    /* this.ingridientAdded.emit(newIngridient); */
    this.shoppingListService.onIngridientAdded(newIngridient);
  }
}
