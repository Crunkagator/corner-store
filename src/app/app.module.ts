/// <reference types="@types/googlemaps" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ShopsComponent } from './shops/shops.component';
import { ViewShopComponent } from './view-shop/view-shop.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ShopsComponent,
    ViewShopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [ItemsComponent, ShopsComponent, ViewShopComponent],
  providers: [NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
