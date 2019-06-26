import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Service } from '../service/service';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit, OnChanges {
  producto: any = {};
  @Input() productId: string;
  constructor(private service: Service, private dbService: DbService) {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.productId) {
      this.getProd();

      // this.service.getProduct(this.productId).subscribe((res) => {
      //   this.dbService.getProduct(this.productId).then((thing) => {
      //     console.log('is in db', thing);
      //   });
      //   this.dbService.addProducto(res, this.productId).then((thing) => {
      //     console.log(thing);
      //   });
      // });
    }
  }
  async getProd() {
    this.producto = await this.dbService.getProduct(this.productId);
  }
}
