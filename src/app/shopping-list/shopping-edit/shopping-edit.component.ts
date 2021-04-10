import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';

import { Ingridient } from '../../shared/ingridients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput',{static : true}) nameInputRef : ElementRef;
  @ViewChild('amountInput',{static : true}) amountInputRef : ElementRef;
  @Output() ingridientAdded = new EventEmitter<Ingridient>(); //<{name: string, amount: number}> a questa dichiarazione possiamo sostituire direttamente il file condiviso Ingridient
  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value
    const ingAmount = this.amountInputRef.nativeElement.value
    const newIngridient = new Ingridient(ingName,ingAmount)
    this.ingridientAdded.emit(newIngridient);
  }
}
