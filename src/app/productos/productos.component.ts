import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Service } from '../service/service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  producto: any;
  constructor(private route: ActivatedRoute, private router: Router, private service: Service) { }
  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.service.getProduct(params.get('id')).subscribe((res) => {
          this.producto = res;
          console.log(this.producto);
        });
      });
  }

}
