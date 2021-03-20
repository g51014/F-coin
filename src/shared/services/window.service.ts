import { EDeviceType } from '@utilities/enums/overlay.enum';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ResizeObserver } from 'resize-observer';
import { ResizeObserverEntry } from 'resize-observer/lib/ResizeObserverEntry';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() {

  }

  get windowWidth() { return window.innerWidth; }
  get windowHeight() { return window.innerHeight; }
  get currentDevice(): EDeviceType {
    return this.windowWidth > EDeviceType.Large ? EDeviceType.Large :
      this.windowWidth > EDeviceType.Desktop ? EDeviceType.Desktop :
        this.windowWidth > EDeviceType.Pad ? EDeviceType.Pad : EDeviceType.Mobile;
  }

  private device: ReplaySubject<EDeviceType> = new ReplaySubject();
  public device$ = this.device.asObservable().pipe(
    distinctUntilChanged(),
    tap((device) => this.onDeviceChange(device))
  );

  public isDesktop(device: EDeviceType) { return device === EDeviceType.Desktop; }
  public isPad(device: EDeviceType) { return device === EDeviceType.Pad; }
  public isMobile(device: EDeviceType) { return device === EDeviceType.Mobile; }

  public resize() {
    this.device.next(this.currentDevice);
  }

  public windowRsizeObserver = (callback: (element: ResizeObserverEntry) => {}) => new ResizeObserver(elements => elements.forEach(element => callback(element)));

  private onDeviceChange(device: EDeviceType) {
    // console.log(device)
  }
}
