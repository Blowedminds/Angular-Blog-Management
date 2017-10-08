import { NgModule } from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { AuthComponent }        from '../auth/auth.component';
import { LoginComponent }       from '../auth/login/login.component';
import { RegisterComponent }    from '../auth/register/register.component';
import { LogoutComponent }      from '../auth/logout/logout.component'
import { ManagementComponent }  from '../management/management.component';
import { DashboardComponent }   from '../management/dashboard/dashboard.component';
import { ArticleComponent }     from '../management/article/article.component'
import { ArticleTrashComponent }from '../management/article/article-trash/article-trash.component'
import { AlbumsComponent }      from '../management/albums/albums.component'
import { ImageEditComponent } from '../management/albums/image-edit/image-edit.component'
import { AdminPanelComponent }  from '../management/admin/admin-panel/admin-panel.component'
import { CategoriesComponent }  from '../management/admin/categories/categories.component'
import { MenusComponent }  from '../management/admin/menus/menus.component'
import { LanguagesComponent } from '../management/admin/languages/languages.component'

import { AdminRouteGuard }  from '../admin-route.guard'
import { GuestRouteGuard }  from '../guest-route.guard'

const routes: Routes = [
  { path: "", redirectTo: 'management/dashboard', pathMatch: "full" },
  { path: "management", redirectTo: 'management/dashboard', pathMatch: "full" },
  { path: "auth", component: AuthComponent, children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", canActivate: [GuestRouteGuard], component: LoginComponent },
      { path: "register", canActivate: [GuestRouteGuard], component: RegisterComponent },
      { path: "logout", component: LogoutComponent }
    ]
  },
  { path: "management", component: ManagementComponent, canActivateChild: [AdminRouteGuard], children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "articles", component: ArticleComponent },
      { path: "trash" , component: ArticleTrashComponent },
      { path: "albums", component: AlbumsComponent },
      { path: "albums/edit/:image", component: ImageEditComponent },
      { path: "admin", component: AdminPanelComponent, children: [
        { path: "categories", component: CategoriesComponent, outlet: "settings"},
        { path: "menus", component: MenusComponent, outlet: "settings"},
        { path: "languages", component: LanguagesComponent, outlet: "settings"}
      ]}
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
