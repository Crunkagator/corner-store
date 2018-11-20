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

  constructor(public activeModal: NgbActiveModal) { }

  checkInput() {
    if (this.shopName.status === 'INVALID') {
      document.getElementById('errName').innerHTML = `Shop's name must be non-empty and less than 100 symbols`;
    }
    if (this.address.status === 'INVALID') {
      document.getElementById('errAddress').innerHTML = `Address must be non-empty and less than 100 symbols`;
    }
    if (this.schedule.status === 'INVALID') {
      document.getElementById('errSchedule').innerHTML = `Schedule must be non-empty and specified like h:mm - h:mm`;
    }
    if (this.shopName.status === 'VALID' && this.address.status === 'VALID' && this.schedule.status === 'VALID') {
      this.activeModal.close({ 'name': this.shopName.value.trim(), 'address': this.address.value, 'schedule': this.schedule.value });
    }
  }

  ngOnInit() {
    this.shopName = new FormControl('', [Validators.required, Validators.maxLength(100),
      Validators.pattern(/[a-zА-Я0-9\/!-+'*#]+/gi)]);
    this.address = new FormControl('', [Validators.required, Validators.maxLength(100),
      Validators.pattern(/^[а-яА-Я]+\s\d+\,\s[а-яA-Z]+(\,\s[а-яA-Z]+|)$/gi)]);
    this.schedule = new FormControl('', [Validators.required,
      Validators.pattern(/^((|[0-1])[0-9]|2[0-3])\:[0-5][0-9]\s-\s((|[0-1])[0-9]|2[0-3])\:[0-5][0-9]$/g)]);
  }
}
