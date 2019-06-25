import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';

import { Service } from '../service/service';
import { GlobalService } from '../service/globalservice';
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  loading: boolean;
  ruta: string;
  categoria: any = {};
  constructor(private route: ActivatedRoute, private router: Router, private service: Service, private globalService: GlobalService) {}
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
    if(model.nsprods){
      model.nsprods = model.nsprods.split(',');
    }
    return model;
  }

  ngOnInit() {
    this.loading = true;
    this.route.url.subscribe((ruta: UrlSegment[]) => {
      this.ruta = ruta.map((r) => r.path).join('/');
      this.service.getCategory(this.ruta).subscribe((res) => {
        this.loading = false;
        if (_.isEmpty(res[0])) {
          this.router.navigate(['home']);
        } else {
          this.categoria = this.serializer(res[0]);
          console.log(this.categoria);
        }
      });
    });
  }
}
