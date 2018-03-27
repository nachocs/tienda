import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Service } from '../service/service';
import * as moment from 'moment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  producto: any;
  loading: Boolean = false;
  root_url: String = 'http://www1.dreamers.com';
  constructor(private route: ActivatedRoute, private router: Router, private service: Service) { }
  ngOnInit() {
    this.loading = true;
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.service.getProduct(params.get('id')).subscribe((res) => {
          this.loading = false;
          this.producto = this.serializer(res);

          console.log(this.producto);
        });
      });
  }
  serializer(model) {
    let time;
    if (model.TIME_A) {
      time = new Date();
      time.setTime(model.TIME_A + '000');
      model.date = moment(time).format('l');
    } else if (model.FECHA) {
      time = new Date();
      time.setTime(model.FECHA + '000');
      model.date = moment(time).format('l');
    }
    return model;
  }
}
