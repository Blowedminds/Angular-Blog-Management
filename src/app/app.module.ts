import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ArticleModule } from './article/article.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ArticleModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
