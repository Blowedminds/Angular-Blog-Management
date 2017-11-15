import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import {
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatTabsModule,
  MatInputModule,
  MatChipsModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatButtonModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatTableModule
} from '@angular/material'

import { CdkTableModule } from "@angular/cdk/table"

import { AppComponent } from './app.component';

import { UserRequestService }  from './request-services/user-request.service';
import { MainRequestService }   from './request-services/main-request.service';
import { AuthRequestService }   from './request-services/auth-request.service';
import { ArticleRequestService }  from './request-services/article-request.service'
import { ApiService }           from './api.service';
import { AdminRouteGuard }  from './admin-route.guard'
import { GuestRouteGuard }  from './guest-route.guard'
import { ImageRequestService }  from "./request-services/image-request.service"
import { UserService }  from './system-services/user.service'
import { GlobalDataService }  from './system-services/global-data.service'
import { AdminRequestService }  from './request-services/admin-request.service'

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './management/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { ManagementComponent } from './management/management.component';
import { ArticleComponent } from './management/article/article.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ArticleTrashComponent } from './management/article/article-trash/article-trash.component';
import { AlbumsComponent } from './management/albums/albums.component'

import { ImageAddComponent }  from './dialogs/albums/image-add/image-add.component';
import { ImageEditComponent } from './management/albums/image-edit/image-edit.component';
import { ImageSelectComponent } from './dialogs/albums/image-select/image-select.component';
import { AddArticleComponent } from './dialogs/articles/add-article/add-article.component';
import { AddArticleLanguageComponent } from './dialogs/articles/add-article-language/add-article-language.component';
import { EditArticleLanguageComponent } from './dialogs/articles/edit-article-language/edit-article-language.component';
import { EditArticleComponent } from './dialogs/articles/edit-article/edit-article.component';
import { ManagePermissionComponent } from './dialogs/articles/manage-permission/manage-permission.component';
import { SaveAsComponent } from './dialogs/albums/save-as/save-as.component';
import { AdminPanelComponent } from './management/admin/admin-panel/admin-panel.component';
import { CategoriesComponent } from './management/admin/categories/categories.component';
import { MenusComponent } from './management/admin/menus/menus.component';
import { LanguagesComponent } from './management/admin/languages/languages.component';
import { ProfileComponent } from './management/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AuthComponent,
    ManagementComponent,
    ArticleComponent,
    LogoutComponent,
    ArticleTrashComponent,
    AlbumsComponent,
    ImageAddComponent,
    ImageEditComponent,
    ImageSelectComponent,
    AddArticleComponent,
    AddArticleLanguageComponent,
    EditArticleLanguageComponent,
    EditArticleComponent,
    ManagePermissionComponent,
    SaveAsComponent,
    AdminPanelComponent,
    CategoriesComponent,
    MenusComponent,
    LanguagesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTableModule,
    CdkTableModule
  ],

  providers: [
    UserRequestService,
    MainRequestService,
    AuthRequestService,
    ApiService,
    ArticleRequestService,
    AdminRouteGuard,
    GuestRouteGuard,
    ImageRequestService,
    UserService,
    AdminRequestService,
    GlobalDataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddArticleLanguageComponent,
    EditArticleLanguageComponent,
    EditArticleComponent,
    AddArticleComponent,
    ImageAddComponent,
    ImageSelectComponent,
    ManagePermissionComponent,
    SaveAsComponent
  ]
})
export class AppModule { }
