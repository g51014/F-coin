import { ResizeObserver } from 'resize-observer';
import { tap } from 'rxjs/operators';
import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';
import { WindowService } from '@services/window.service';
import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';
import { EDeviceType } from '@utilities/enums/overlay.enum';

@Directive({
  selector: '[appResponsiveViewport]',
})
export class ResponsiveViewportDirective
  extends UnsubOndestroy
  implements OnInit {
  @Input() responseBuffer: Element[] = [];

  constructor(
    private e: ElementRef,
    private $window: WindowService,
    private render: Renderer2
  ) {
    super();
  }

  private resize$: ResizeObserver;
  get bufferHeight() { return this.responseBuffer.reduce((total, current) => total = total + current.clientHeight, 0); }

  ngOnInit() {
    this.resize$ = this.$window.windowRsizeObserver(
      this.resizeViewport.bind(this)
    );
    this.$window.device$
      .pipe(tap((device) => this.onDeviceChanged(device)))
      .subscribe();
  }

  private onDeviceChanged(device: EDeviceType) {
    if (this.$window.isMobile(device)) {
      this.resize$.observe(this.e.nativeElement);
    } else {
      this.resize$.disconnect();
      this.render.removeStyle(this.e.nativeElement, 'height');
    }
  }

  private resizeViewport() {
    this.render.setStyle(
      this.e.nativeElement,
      'height',
      `${this.$window.windowHeight - this.bufferHeight}px`
    );
  }
}
