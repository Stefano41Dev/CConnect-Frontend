import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appMouseTrackingEffect]',
  standalone: true,
})
export class MouseTrackingEffectDirective implements OnInit, OnDestroy {
  private mouseX = 0;
  private mouseY = 0;
  private glowElement: HTMLElement | null = null;
  private distortionElement: HTMLElement | null = null;
  private animationFrameId: number | null = null;
  private isMouseOver = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.createGlowEffect();
    this.createDistortionEffect();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.glowElement && this.glowElement.parentNode) {
      this.renderer.removeChild(this.el.nativeElement, this.glowElement);
    }
    if (this.distortionElement && this.distortionElement.parentNode) {
      this.renderer.removeChild(this.el.nativeElement, this.distortionElement);
    }
  }

  private createGlowEffect(): void {
    this.glowElement = this.renderer.createElement('div');
    this.renderer.addClass(this.glowElement, 'mouse-glow');
    this.renderer.insertBefore(
      this.el.nativeElement,
      this.glowElement,
      this.el.nativeElement.firstChild,
    );
  }

  private createDistortionEffect(): void {
    this.distortionElement = this.renderer.createElement('div');
    this.renderer.addClass(this.distortionElement, 'mouse-distortion');
    this.renderer.insertBefore(
      this.el.nativeElement,
      this.distortionElement,
      this.el.nativeElement.firstChild,
    );
  }

  private setupEventListeners(): void {
    this.el.nativeElement.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this),
    );
    this.el.nativeElement.addEventListener(
      'mouseenter',
      this.onMouseEnter.bind(this),
    );
    this.el.nativeElement.addEventListener(
      'mouseleave',
      this.onMouseLeave.bind(this),
    );
  }

  private onMouseEnter(): void {
    this.isMouseOver = true;
    if (this.glowElement) {
      this.renderer.setStyle(this.glowElement, 'opacity', '1');
    }
    if (this.distortionElement) {
      this.renderer.setStyle(this.distortionElement, 'opacity', '1');
    }
  }

  private onMouseMove(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {
      this.updateGlowPosition();
      this.updateDistortion();
    });
  }

  private updateGlowPosition(): void {
    if (!this.glowElement || !this.isMouseOver) return;

    this.renderer.setStyle(
      this.glowElement,
      'left',
      `${this.mouseX}px`,
    );
    this.renderer.setStyle(
      this.glowElement,
      'top',
      `${this.mouseY}px`,
    );
  }

  private updateDistortion(): void {
    if (!this.distortionElement || !this.isMouseOver) return;

    this.renderer.setStyle(
      this.distortionElement,
      'background',
      `radial-gradient(
        circle 200px at ${this.mouseX}px ${this.mouseY}px,
        rgba(168, 100, 255, 0.15) 0%,
        rgba(168, 100, 255, 0.08) 30%,
        rgba(168, 100, 255, 0.02) 60%,
        transparent 85%
      )`,
    );
  }

  private onMouseLeave(): void {
    this.isMouseOver = false;
    if (this.glowElement) {
      this.renderer.setStyle(this.glowElement, 'opacity', '0');
    }
    if (this.distortionElement) {
      this.renderer.setStyle(this.distortionElement, 'opacity', '0');
    }
  }
}
