import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class Service {
    BASE_API_URL: String = 'http://dreamers.com/com/home2/cgi';
    constructor(private http: HttpClient) {
    }
    private handleMap(res: any) {
        return res;
    }
    private handleError(error: HttpErrorResponse) {
        const errorMsg = 'Connection Error';
        return Observable.throw(errorMsg);
    }
    private getHttp(url): Observable<any> {
        return this.http.get(url)
            .map((res) => this.handleMap(res))
            .catch(this.handleError);
    }
    getProduct(productId: string) {
        const url = this.BASE_API_URL + '/json.cgi?indice=tienda/productos&entrada=' + productId;
        return this.getHttp(url);
    }
}
