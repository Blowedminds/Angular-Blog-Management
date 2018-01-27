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
  MatTableModule,
  MatPaginatorModule
} from '@angular/material'

import { CdkTableModule } from "@angular/cdk/table"
import { ObserversModule }  from "@angular/cdk/observers"

import * as services from "./exports/services"
import * as components from "./exports/components"
import * as dialogs from "./exports/dialogs"

@NgModule({
  declarations: [
    components.AppComponent,
    components.LoginComponent,
    components.RegisterComponent,
    components.DashboardComponent,
    components.AuthComponent,
    components.ManagementComponent,
    components.ArticleComponent,
    components.LogoutComponent,
    components.ArticleTrashComponent,
    components.AlbumsComponent,
    dialogs.ImageAddComponent,
    dialogs.ImageSelectComponent,
    dialogs.AddArticleComponent,
    dialogs.AddArticleLanguageComponent,
    dialogs.EditArticleLanguageComponent,
    dialogs.EditArticleComponent,
    dialogs.ManagePermissionComponent,
    dialogs.SaveAsComponent,
    components.ImageEditComponent,
    components.AdminPanelComponent,
    components.CategoriesComponent,
    components.MenusComponent,
    components.LanguagesComponent,
    components.ProfileComponent,
    components.PageNotFoundComponent,
    components.RedirectComponent
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
    MatPaginatorModule,
    CdkTableModule,
    ObserversModule
  ],

  providers: [
    services.UserRequestService,
    services.MainRequestService,
    services.AuthRequestService,
    services.ApiService,
    services.ArticleRequestService,
    services.AdminRouteGuard,
    services.GuestRouteGuard,
    services.ImageRequestService,
    services.UserService,
    services.AdminRequestService,
    services.GlobalDataService
  ],
  bootstrap: [components.AppComponent],
  entryComponents: [
    dialogs.AddArticleLanguageComponent,
    dialogs.EditArticleLanguageComponent,
    dialogs.EditArticleComponent,
    dialogs.AddArticleComponent,
    dialogs.ImageAddComponent,
    dialogs.ImageSelectComponent,
    dialogs.ManagePermissionComponent,
    dialogs.SaveAsComponent
  ]
})
export class AppModule { }
