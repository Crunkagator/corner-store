/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsComponent, Item } from './items/items.component';

class Shop {
  public name: string;
  public address: string;
  public ID: number;
  public hours: Date;
  public goods = [];
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  public addLocation(map: google.maps.Map) {
    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'address': this.address }, (res, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(res[0].geometry.location);
        const marker = new google.maps.Marker({
          map: map,
          position: res[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
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
  geocoder: google.maps.Geocoder;
  private shops = [];
  constructor(private modalService: NgbModal) { }

  addGoods(id: number) {
    const modalRef = this.modalService.open(ItemsComponent).result.then((result) => {
      const item = new Item(result.itemName, result.price, result.description);
      // console.log(id, item);
      this.shops[id - 1].goods.push(item);
    });
  }

  addShop(shop: string, address: string) {
    for (const sh of this.shops) {
      if (sh.name === shop) {
        alert('You already have this shop!'); return;
      }
    }
    const ThriftShop = new Shop(shop, address);
    ThriftShop.ID = this.shops.length + 1;
    this.shops.push(ThriftShop);
    console.log(this.shops);
    ThriftShop.addLocation(this.map);
  }

  deleteShop(shop: string) {
    this.shops = this.shops.filter(a => a !== shop);
    this.shopsRefreshId();
  }

  deleteItem(item: string, id: number) {
    this.shops[id - 1].goods = this.shops[id - 1].goods.filter(a => a !== item);
  }

  shopsRefreshId() {
    this.shops.forEach((arg) => arg.ID = this.shops.indexOf(arg) + 1);
  }

  ngOnInit() {
    const mapProps = {
      center: { lat: 53.910, lng: 27.570 },
      zoom: 16
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapProps);
    this.addShop('Sample', 'Киселева 9, Минск, Беларусь ');
  }
}
