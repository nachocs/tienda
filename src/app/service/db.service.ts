import { Injectable } from '@angular/core';
import * as moment from 'moment';

import * as idb from 'idb';
import { Service } from './service';

const ROOT_IMAGEN_URL = 'https://tienda.dreamers.es';
@Injectable()
export class DbService {
  productosDb: any;
  productosStore: any;
  constructor(private service: Service) {
    this.productosDb = idb.openDB('Productos', 1, {
      upgrade(db: idb.IDBPDatabase<any>) {
        db.createObjectStore('productos', {
          keyPath: 'ID',
        });
      },
    });
    this.clearDb('productos');
  }
  async clearDb(dbname) {
    const db = await idb.openDB('Productos', 1);
    db.clear(dbname);
  }

  async addProducto(producto, id) {
    const db = await idb.openDB('Productos', 1);
    if (db) {
      const tx = db.transaction('productos', 'readwrite');
      const store = tx.objectStore('productos');

      try {
        await store.get(id);
      } catch (error) {
        await store.add(producto);
      }
      await store.put(producto);

      return await tx.done;
    }
  }
  async getProductFromDb(id) {
    const db = await idb.openDB('Productos', 1);

    const tx = db.transaction('productos', 'readwrite');
    const store = tx.objectStore('productos');
    const prod = await store.get(id);
    return prod;
  }

  async getProduct(id) {
    let producto = await this.getProductFromDb(id);
    if (!producto) {
      producto = await this.service.getProduct(id).toPromise();
      await this.addProducto(producto, id);
    }
    return this.serializer(producto);
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
    if (model.IMAGEN) {
      model.imagen_url = ROOT_IMAGEN_URL + model.IMAGEN;
    }
    return model;
  }
}
