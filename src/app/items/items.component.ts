import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';

export class Item {
  itemName: string;
  price: string;
  description: string;
  constructor(name: string, price: string, description: string) {
    this.itemName = name;
    this.price = price;
    this.description = description;
  }
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})

export class ItemsComponent implements OnInit {

  public itemName: FormControl;
  public price: FormControl;
  public description: FormControl;

  checkInput() {
    if (this.itemName.status === 'INVALID') {
      document.getElementById('errItemName').innerHTML = 'Item name must be non-empty and less than 50 symbols';
    }
    if (this.price.status === 'INVALID') {
      document.getElementById('errPrice').innerHTML = `Price must be less than 12 digits long and specified properly`;
    }
    if (this.description.status === 'INVALID') {
      document.getElementById('errDescr').innerHTML = 'Description must be non-empty and less than 500 symbols';
    }
    if (this.itemName.status === 'VALID' && this.price.status === 'VALID' && this.description.status === 'VALID') {
      this.activeModal.close({'itemName' : this.itemName.value, 'price': this.price.value, 'description' : this.description.value});
    }
  }
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.itemName = new FormControl('', [Validators.required , Validators.maxLength(50), Validators.pattern(/[a-zА-Я0-9\/!\-'#]+/gi)]);
    this.price = new FormControl('', [Validators.required , Validators.maxLength(12), Validators.pattern(/^(\d+\.\d{2}|0\.[1-9][0-9])$/g)]);
    this.description = new FormControl('', [Validators.required , Validators.maxLength(500), Validators.pattern(/\S+/g)]);
  }
}
