import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

export class ItemsComponent {
  @Input() title = 'Items';

  constructor(public activeModal: NgbActiveModal) {}

}
