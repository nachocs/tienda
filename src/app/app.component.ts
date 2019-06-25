import { Component, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { GlobalService } from './service/globalservice';
import { DbService } from './service/db.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'app';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  fillerNav = Array(50)
    .fill(0)
    .map((_, i) => `Nav Item ${i + 1}`);
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private globalService: GlobalService,
    private dbService: DbService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.globalService.fetch('formatos');
    this.globalService.fetch('enc');
    this.globalService.fetch('temas');
    this.globalService.fetch('idiomas');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
