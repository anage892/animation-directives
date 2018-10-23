import { Directive, ElementRef, Input, OnDestroy, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var TweenMax: any;

@Directive({
  selector: '[arkFlashAnimation]'
})
export class FlashAnimationDirective implements OnInit {
  
  @Input() flashUponExistence = false;
  @Input() flashUponClickage = false;
  @Input('flashWhenAsked') whenAsked$: BehaviorSubject<boolean>;

  elRef: ElementRef<any>;

  constructor(el: ElementRef) {
    this.elRef = el;
  }

  ngOnInit() {
// Run animation on initialization
    if (this.flashUponExistence) this.runAnimation(this.elRef);

// Run animation when manually triggered by the element's container component (coding in container component required)
    this.whenAsked$.subscribe(obs => {
      if (obs === true) this.runAnimation(this.elRef);
    });
  }

  ngOnDestroy() {
    // TODO: Add unsubscription ("this.whenAsked$.unsubscribe" wasn't working at the time of this comment's writing)
  }

// Run animation when the element is clicked
  @HostListener('click', ['$event']) onclick($event) {
    if (this.flashUponClickage) this.runAnimation(this.elRef);
  }

  runAnimation(elRef: ElementRef) {
    TweenMax.to(elRef.nativeElement, 0.5, {
      opacity: 0
    });
    TweenMax.to(elRef.nativeElement, 0.5, {
      opacity: 1,
      delay: 0.4
    });
    TweenMax.to(elRef.nativeElement, 0.5, {
      opacity: 0,
      delay: 0.8
    });
    TweenMax.to(elRef.nativeElement, 0.5, {
      opacity: 1,
      delay: 1.2
    });
  }
}
