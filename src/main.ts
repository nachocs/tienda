import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import fontawesome from '@fortawesome/fontawesome';
import * as faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
fontawesome.library.add(faShoppingCart);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
