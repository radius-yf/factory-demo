import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, asyncScheduler, share, subscribeOn, tap } from 'rxjs';

@Injectable()
export class LayoutBackgroundService {
  private _bgPortal = new BehaviorSubject<TemplatePortal | null>(null);
  set bgTemplate(portal: TemplatePortal | null) {
    this._bgPortal.next(portal);
  }
  portal = this._bgPortal.pipe(subscribeOn(asyncScheduler), tap(console.log), share());

  bgImage = '';
}
