import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { AppRoutingModule } from './app-routing.module';
import { UserDataService } from './providers/user-data.service'
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components//navbar/navbar.component';
import { LeftbarComponent } from './components//leftbar/leftbar.component';
import { MainHeaderComponent } from './components//main-header/main-header.component';
import { TasksComponent } from './components//tasks/tasks.component';
import { LoginComponent } from './components//login/login.component';
import { RegisterComponent } from './components//register/register.component';
import { ServerAuthService } from './providers/server-auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './providers/token-interceptor.service';
import { AuthGoogleComponent } from './components//auth-google/auth-google.component';
import {LocationStrategy, Location, HashLocationStrategy} from '@angular/common';
import { LeftbarAllComponent } from './components//leftbar-all/leftbar-all.component';
import { TasksLeftbarComponent } from './components//tasks-leftbar/tasks-leftbar.component';
import { GroupsLeftbarComponent } from './components//groups-leftbar/groups-leftbar.component';
import { ServerDatabaseService } from './providers/server-database.service';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    NavbarComponent,
    LeftbarComponent,
    MainHeaderComponent,
    TasksComponent,
    LoginComponent,
    RegisterComponent,
    AuthGoogleComponent,
    LeftbarAllComponent,
    TasksLeftbarComponent,
    GroupsLeftbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    PasswordStrengthMeterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, ServerAuthService, AuthGuard, UserDataService, ServerDatabaseService,  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  Location, {provide: LocationStrategy, useClass: HashLocationStrategy}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
