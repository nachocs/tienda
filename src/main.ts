import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import fontawesome from '@fortawesome/fontawesome';
import * as faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import * as faBullseye from '@fortawesome/fontawesome-free-solid/faBullseye';
fontawesome.library.add(faShoppingCart);
fontawesome.library.add(faBullseye);
import * as moment from 'moment';
moment.locale('es');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
