import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { TripManagerComponent } from './trip-manager/trip-manager.component';
import { TripComponent } from './trip/trip.component';
import { RemoveTripComponent } from './remove-trip/remove-trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RateTripComponent } from './rate-trip/rate-trip.component';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CustomDate } from './trip/trip-date-format';
import { SearchDate } from './trip-manager/trip-search-date';
import { SearchPrice } from './trip-manager/trip-search-price';
import { SearchRating } from './trip-manager/trip-search-rating';
import { SearchDestination } from './trip-manager/trip-search-destination';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { Routes, RouterModule } from '@angular/router';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { LoginComponent } from './login/login.component';
import { LoggedGuard } from './guards/logged.guard';
import { EditTripComponent } from './edit-trip/edit-trip.component';

const routes: Routes = [
  { path: '', redirectTo: '/Trips', pathMatch:'full'},
  { path: 'Trips', component: TripManagerComponent, canActivate: [LoggedGuard] },
  { path: 'New_Trip', component: AddTripComponent},
  { path: 'Basket', component: ShoppingBasketComponent},
  { path: 'Trips/:id', component: TripDetailsComponent},
  { path: 'Login', component: LoginComponent},
  { path: '**', component: LoginComponent }];


@NgModule({
  declarations: [
    AppComponent,
    TripManagerComponent,
    TripComponent,
    RemoveTripComponent,
    AddTripComponent,
    RateTripComponent,
    SearchTripComponent,
    CustomDate,
    SearchDate,
    SearchPrice,
    SearchRating,
    SearchDestination,
    ShoppingBasketComponent,
    TripDetailsComponent,
    LoginComponent,
    EditTripComponent,
  ],
  imports: [
    NgxSliderModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
