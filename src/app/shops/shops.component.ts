import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.less']
})
export class ShopsComponent implements OnInit {

  public shopName: FormControl;
  public address: FormControl;
  public schedule: FormControl;

  checkInput() {
    if (this.shopName.status === 'INVALID' || this.address.status === 'INVALID') {
      document.getElementById('error').innerHTML = 'Invalid input (must be non-empty and less than 100 symbols)';
    }
    if (this.schedule.status === 'INVALID') {
      document.getElementById('error').innerHTML = `Wrong time format: must be h:mm - h:mm`;
    }
    if (this.shopName.status === 'VALID' && this.address.status === 'VALID' && this.schedule.status === 'VALID') {
      this.activeModal.close({ 'name': this.shopName.value, 'address': this.address.value, 'schedule': this.schedule.value });
    }
  }

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.shopName = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.address = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.schedule = new FormControl('', [Validators.required, Validators.pattern(/\d(\d|)\:\d\d\s-\s\d(\d|)\:\d\d/g)]);
  }
}
