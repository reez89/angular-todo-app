import { Ingridient } from "../shared/ingridients.model";

import { Subject } from 'rxjs';

export class ShoppingListService{
  ingridientsChange = new Subject<Ingridient[]>();
  startedEditing = new Subject<number>();
  private ingridients:Ingridient[] = [
    new Ingridient('Apples',10),
    new Ingridient('Tomatoes',5),
  ];

  getIingridients(){
    return this.ingridients.slice(); // otteniamo sempre una copia del nostro array.
  }

  getIngridient(index:number){
    return this.ingridients[index];
  }
  onIngridientAdded(ingridient: Ingridient){
    this.ingridients.push(ingridient);
    this.ingridientsChange.next(this.ingridients.slice());
    // per questo aggiungiamo questo motodo che ci permette di aggiungere un nuovo componente e anche di visualizzarlo nel nostro sito.
  }

  addIngridients(ingridients: Ingridient[]){
    // for (let ingridient of ingridients){
     // this.onIngridientAdded(ingridient);
    // }
    this.ingridients.push(...ingridients);
    this.ingridientsChange.next(this.ingridients.slice())
  }

  updateIngridient(index:number, newIngridient:Ingridient){
    this.ingridients[index] = newIngridient;
    this.ingridientsChange.next(this.ingridients.slice())
  }

  deleteIngridient(index:number){
    this.ingridients.splice(index,1);
    this.ingridientsChange.next(this.ingridients.slice());
  }
}
