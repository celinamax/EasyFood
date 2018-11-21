import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-total-compras',
  templateUrl: './total-compras.component.html'
})
export class TotalComprasComponent implements OnInit {

  @Input() totalCompra: number


  constructor() { }

  ngOnInit() {
  }

}
