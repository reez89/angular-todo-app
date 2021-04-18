import { Ingridient } from "../shared/ingridients.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService{
  ingridientsChange = new EventEmitter<Ingridient[]>();
  private ingridients:Ingridient[] = [
    new Ingridient('Apples',10),
    new Ingridient('Tomatoes',5),
  ];

  getIingridients(){
    return this.ingridients.slice(); //otteniamo sempre una copia del nostro array.
  }
  onIngridientAdded(ingridient: Ingridient){
    this.ingridients.push(ingridient);
    this.ingridientsChange.emit(this.ingridients.slice()); //per questo aggiungiamo questo motodo che ci permette di aggiungere un nuovo componente e anche di visualizzarlo nel nostro sito.
  }
}
