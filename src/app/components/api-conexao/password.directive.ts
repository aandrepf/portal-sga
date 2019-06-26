import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class AppPasswordDirective {
  private _show = false;

  constructor(private el: ElementRef) {
    setTimeout(() => {
      this.setup();
    }, 1500);
  }

  setup() {
    const parent = this.el.nativeElement.parentNode;
    const icone = document.getElementById('showPass');



    icone.addEventListener('mouseover', (event) => {

      this._show = !this._show;

      icone.classList.remove('fa-eye-slash');
      icone.classList.add('fa-eye');


      this.el.nativeElement.setAttribute('type', 'text');
    });

    icone.addEventListener('mouseout', (event) => {

      this._show = !this._show;

      icone.classList.remove('fa-eye');
      icone.classList.add('fa-eye-slash');


      this.el.nativeElement.setAttribute('type', 'password');
    });
  }
}
