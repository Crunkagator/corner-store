/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsComponent, Item } from './items/items.component';
import { ShopsComponent } from './shops/shops.component';
import { ViewShopComponent } from './view-shop/view-shop.component';

class Shop {
  public name: string;
  public address: string;
  public ID: number;
  public schedule: string;
  public goods = [];
  public marker: any;
  constructor(name, address, schedule) {
    this.name = name;
    this.address = address;
    this.schedule = schedule;
    this.marker = {};
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  title = 'corner-store';
  map: google.maps.Map;
  private shops = Array<Shop>();
  private markers = Array<google.maps.Marker>();
  constructor(private modalService: NgbModal) { }

  addItem(id: number) {
    this.modalService.open(ItemsComponent).result.then((result) => {
      const item = new Item(result.itemName, result.price, result.description);
      this.shops[id - 1].goods.push(item);
      localStorage.setItem(this.shops[id - 1].name, JSON.stringify(this.shops[id - 1]));
    });
  }

  async addMark(shop: Shop, map: google.maps.Map) {
    const geocoder = new google.maps.Geocoder;
    let mark: google.maps.Marker;
    geocoder.geocode({ 'address': shop.address }, (res, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(res[0].geometry.location);
        mark = new google.maps.Marker({
          map: map,
          position: res[0].geometry.location,
          label: (shop.name[0] + shop.name[shop.name.length - 1]).toUpperCase()
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    shop.marker = await mark;
    return await mark;
  }

  addShop() {
    this.modalService.open(ShopsComponent).result.then((result) => {
      for (const sh of this.shops) {
        if (sh.name === result.shopName) {
          alert('You already have this shop!'); return;
        }
      }
      const ThriftShop = new Shop(result.name, result.address, result.schedule);
      ThriftShop.ID = this.shops.length + 1;
      this.addMark(ThriftShop, this.map).then(a => this.shops.push(ThriftShop));
      localStorage.setItem(ThriftShop.name, JSON.stringify(ThriftShop));
      console.log(this.markers);
    });
  }

  deleteLocation(shop: Shop) {
    shop.marker.setMap(null);
  }

  viewInfo(shop: Shop) {
    const modal = this.modalService.open(ViewShopComponent, { size: 'lg' });
    modal.componentInstance.shop = shop;
  }

  getStorage() {
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      this.shops.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    console.log(this.shops);
    this.shops.forEach(sh => this.addMark(sh, this.map));
  }

  deleteShop(shop: Shop) {
    this.shops = this.shops.filter(a => a !== shop);
    console.log(shop.name);
    localStorage.removeItem(shop.name);
    this.shopsRefreshId();
    this.deleteLocation(shop);
  }

  deleteItem(item: string, id: number) {
    this.shops[id - 1].goods = this.shops[id - 1].goods.filter(a => a !== item);
    localStorage.setItem(this.shops[id - 1].name, JSON.stringify(this.shops[id - 1]));
  }

  shopsRefreshId() {
    localStorage.clear();
    this.shops.forEach(arg => arg.ID = this.shops.indexOf(arg) + 1);
    this.shops.forEach(a => localStorage.setItem(a.name, JSON.stringify(a)));
  }

  ngOnInit() {
    const mapProps = {
      center: { lat: 53.910, lng: 27.570 },
      zoom: 16
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapProps);
    this.getStorage();
  }
}
