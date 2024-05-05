import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
      { path: "", component: HomeComponent },
      { path: "home", component: HomeComponent },
      { path: "userlist", component: UserListComponent },
    ];
