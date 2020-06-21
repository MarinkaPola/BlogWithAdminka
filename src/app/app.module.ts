import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostsComponent } from './shared/components/posts/posts.component';
import {SharedModule} from './shared/shared.module';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule} from '@angular/common/http';
import {AddCommentComponent} from './comments/add-comment/add-comment.component';
import {ReactiveFormsModule} from '@angular/forms';


registerLocaleData(ruLocale, 'ru');


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostsComponent,
      AddCommentComponent
  ],
  providers: [INTERCEPTOR_PROVIDER],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },

            // compiler configuration
            // compiler: {
            // provide: TranslateCompiler,
            //  useClass: TranslateMessageFormatCompiler
            // }
        }),
        ReactiveFormsModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
