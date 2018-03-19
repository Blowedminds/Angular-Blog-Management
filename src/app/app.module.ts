import { NgModule } from '@angular/core';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { MaterialModule } from './material/material.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AdminModule,
    AppRoutingModule,
    ArticleModule,
    AuthModule,
    ImageModule,
    MaterialModule,
    UserModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
