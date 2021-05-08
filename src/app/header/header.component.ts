import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService){}
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  ngOnInit() {
   this.userSub = this.authService.user.subscribe(user => {
     this.isAuthenticated = !user ? false : true;
     console.log(user);
     console.log(!user);
    });
    console.log('questo è isAuthenticated',this.isAuthenticated);
  }
  onSave(){
    this.dataStorageService.storeRecipes();
  }

  onFetch(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
