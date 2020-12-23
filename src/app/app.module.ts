import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HomeComponent} from './_components/home/home.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import {registerLocaleData} from "@angular/common";

import localeFr from '@angular/common/locales/fr';
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {LoginComponent} from './_components/login/login.component';
import {AddEventComponent} from './_components/bottomsheets/add-event/add-event.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./_interceptor/api.interceptor";
import { EventDetailsComponent } from './_components/bottomsheets/event-details/event-details.component';
import { WeightComponent } from './_components/weight/weight.component';
import {GoogleChartsModule} from "angular-google-charts";
import { DataListComponent } from './_components/weight/data-list/data-list.component';
import { ConfirmComponent } from './_dialogs/confirm/confirm.component';
import { AddWeightComponent } from './_dialogs/add-weight/add-weight.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddEventComponent,
    EventDetailsComponent,
    WeightComponent,
    DataListComponent,
    ConfirmComponent,
    AddWeightComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FlexLayoutModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
