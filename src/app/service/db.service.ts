import { Injectable } from '@angular/core';

import * as idb from 'idb';
import { Service } from './service';

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
    return producto;
  }
}
