import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService){}
  collapsed = true;
  // per poter rendere accessibile questo evento all'esterno devo creare un EventEmitter
  /* @Output() featureSelected = new EventEmitter<string>(); */

  // qui creo la funzione che mi restituirà in base all'elemento selzionato nel DOM, la mia "rotta"
 /*  onSelect(feature: string){
    this.featureSelected.emit(feature);
  } */

  // una volta settate le rotte, questi metodi diventano inutili, perchè sostituiti con router link.

  onSave(){
    this.dataStorageService.storeRecipes();
  }

  onFetch(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
