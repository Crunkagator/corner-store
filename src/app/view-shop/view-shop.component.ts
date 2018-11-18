import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-shop',
  templateUrl: './view-shop.component.html',
  styleUrls: ['./view-shop.component.less']
})
export class ViewShopComponent {

  @Input() shop;

  constructor(public activeModal: NgbActiveModal) { }

}
