import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Service } from '../service/service';
import { GlobalService } from '../service/globalservice';
import * as moment from 'moment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  producto: any;
  loading: Boolean = false;
  root_url: String = 'https://tienda.dreamers.es';
  formatos: any;
  enc: any;
  temas: any;
  idiomas: any;
  estados: any = {
    MB: 'Muy bueno',
    B: 'Bueno',
    R: 'Regular',
    P: 'Pasable',
  };
  constructor(private route: ActivatedRoute, private router: Router, private service: Service, private globalService: GlobalService) {
    this.globalService.getConfig('formatos').subscribe((data) => {
      this.formatos = data;
    });
    this.globalService.getConfig('enc').subscribe((data) => {
      this.enc = data;
    });
    this.globalService.getConfig('temas').subscribe((data) => {
      this.temas = data;
    });
    this.globalService.getConfig('idiomas').subscribe((data) => {
      this.idiomas = data;
    });
  }
  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.service.getProduct(params.get('id')).subscribe((res) => {
        this.loading = false;
        this.producto = this.serializer(res);
      });
    });
  }
  isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }
  aplicaDescuento(euros, oferta) {
    return ((Number(euros) * (100 - Number(oferta))) / 100).toFixed(2);
  }
  valor(key, indice) {
    if (key) {
      const val = this[indice].find((i) => i.ID === key);
      if (val) {
        key = val.Name;
      }
    }
    return key;
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
