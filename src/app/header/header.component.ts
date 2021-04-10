import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  collapsed = true;
  //per poter rendere accessibile questo evento all'esterno devo creare un EventEmitter
  @Output() featureSelected = new EventEmitter<string>();

  //qui creo la funzione che mi restituirà in base all'elemento selzionato nel DOM, la mia "rotta"
  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }
}
