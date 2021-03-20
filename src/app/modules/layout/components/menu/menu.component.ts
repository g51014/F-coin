import { Observable, pipe } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WindowService } from '@services/window.service';
import { AbstractModal } from '@utilities/abstract/modal';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { EDeviceType } from '@utilities/enums/overlay.enum';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends AbstractModal implements OnInit {

  constructor(
    public router: Router,
    private $window: WindowService,
  ) {
    super();
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      tap(_ => this.onRouteChanged())
    ).subscribe();
  }

  private onMobile = pipe(
    filter(device => device !== EDeviceType.Mobile),
    tap(() => this.collapse())
  );

  ngOnInit(): void {
    this.$window.device$.pipe(
      takeUntil(this.onDestroy$),
      this.onMobile,
    ).subscribe();
  }

  private onRouteChanged() {
    if (this.isOpen) {
      this.collapse();
    }
  }
}
