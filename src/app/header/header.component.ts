import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;
  // per poter rendere accessibile questo evento all'esterno devo creare un EventEmitter
  /* @Output() featureSelected = new EventEmitter<string>(); */

  // qui creo la funzione che mi restituirà in base all'elemento selzionato nel DOM, la mia "rotta"
 /*  onSelect(feature: string){
    this.featureSelected.emit(feature);
  } */

  // una volta settate le rotte, questi metodi diventano inutili, perchè sostituiti con router link.

  ngOnInit(){
   this.userSub = this.authService.user.subscribe(user =>{
     this.isAuthenticated = !!user;
   });
  }
  onSave(){
    this.dataStorageService.storeRecipes();
  }

  onFetch(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
