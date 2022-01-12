import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SigninComponent } from './signin/signin.component';
import { HttpHandlerService } from './providers/http-handler.service';
import { UsersComponent } from './post-login/users/users.component';
import { EditUserComponent } from './post-login/edit-user/edit-user.component';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './states/auth/auth.selector';
import { AuthReducer } from './states/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './states/auth/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { AppReducers } from './app.state';
import { UserEffects } from './states/users/user.effects';
import { HttpInterceptorProviders } from './interceptors';

@NgModule({
    declarations: [AppComponent, SigninComponent, NavbarComponent, UsersComponent, EditUserComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule,
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production
    })
    ],
    providers: [HttpInterceptorProviders],
    bootstrap: [AppComponent],
})
export class AppModule { }
