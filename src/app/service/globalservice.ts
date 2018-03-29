import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class GlobalService {
    private formatosSubject = new BehaviorSubject<any>([]);
    formatos: Observable<Response> = this.formatosSubject.asObservable();
    private encSubject = new BehaviorSubject<any>([]);
    enc: Observable<Response> = this.encSubject.asObservable();
    private temasSubject = new BehaviorSubject<any>([]);
    temas: Observable<Response> = this.temasSubject.asObservable();
    private idiomasSubject = new BehaviorSubject<any>([]);
    idiomas: Observable<Response> = this.idiomasSubject.asObservable();

    possibleValues: string[] = ['formatos', 'enc', 'temas', 'idiomas'];

    constructor(public http: HttpClient) {
    }
    fetch(value) {
        return this.http.get(environment.BASE_API_URL + '/json.cgi?indice=tienda/' + value + '&max=100')
            .catch(this.handleError)
            .subscribe((re: any) => {
                this[value + 'Subject'].next(re);
            });
    }

    private handleError(error: HttpErrorResponse | any): any {
        return Observable.throw(error);
    }

    getConfig(item: string): Observable<any> {
        if (this.possibleValues.indexOf(item) === -1) {
            return Observable.throw('no value for ' + item);
        }
        return this[item];
    }

    get(value: string): any {
        return this[value] || null;
    }
}
