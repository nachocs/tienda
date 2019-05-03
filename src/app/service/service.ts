import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class Service {
  BASE_API_URL: String = 'https://dreamers.es/com/home2/cgi';
  constructor(private http: HttpClient) {}
  private handleMap(res: any) {
    return res;
  }
  private handleError(error: HttpErrorResponse) {
    const errorMsg = 'Connection Error';
    return observableThrowError(errorMsg);
  }
  private getHttp(url): Observable<any> {
    return this.http
      .get(url)
      .pipe(map((res) => this.handleMap(res)))
      .pipe(catchError(this.handleError));
  }
  getProduct(productId: string) {
    const url = this.BASE_API_URL + '/json.cgi?indice=tienda/productos&entrada=' + productId;
    return this.getHttp(url);
  }
  getCategory(ruta: string) {
    const url = this.BASE_API_URL + '/json.cgi?indice=tienda/categorias&max=100&encontrar=Name=' + ruta;
    return this.getHttp(url);
  }
}
