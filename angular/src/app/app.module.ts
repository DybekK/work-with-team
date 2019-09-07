import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { AppRoutingModule } from './app-routing.module';
import { UserDataService } from '../user-data.service'
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServerAuthService } from '../server-auth.service';
import { AuthGuard } from '../auth.guard';
import { TokenInterceptorService } from '../token-interceptor.service';
import { AuthGoogleComponent } from './auth-google/auth-google.component';
import {LocationStrategy, Location, HashLocationStrategy} from '@angular/common';
import { LeftbarAllComponent } from './leftbar-all/leftbar-all.component';
import { TasksLeftbarComponent } from './tasks-leftbar/tasks-leftbar.component';
import { GroupsLeftbarComponent } from './groups-leftbar/groups-leftbar.component';
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
    FullCalendarModule,
    PasswordStrengthMeterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, ServerAuthService, AuthGuard, UserDataService,  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  Location, {provide: LocationStrategy, useClass: HashLocationStrategy}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
