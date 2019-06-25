import { Injectable } from '@angular/core';
import * as idb from 'idb';

@Injectable()
export class DbService {
  productosDb: any;
  productosStore: any;
  constructor() {
    this.productosDb = idb.openDB('Productos', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('productos')) {
          this.productosStore = db.createObjectStore('productos', {
            keyPath: 'ID',
          });
        }
      },
    });
  }

  addProducto(producto) {
    const tx = this.productosStore.transaction('productos', 'readwrite');
    tx.store.add(producto);
  }
}
