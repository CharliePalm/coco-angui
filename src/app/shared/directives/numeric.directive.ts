import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {
    private regex: RegExp = new RegExp('^\\d*(\\.\\d{0,2})?$'); // Matches numbers with one optional decimal place
    constructor(private el: ElementRef) { }
    @HostListener('input', ['$event']) 
    onInputChange(event: any): void {
      const inputValue = this.el.nativeElement.value;
      if (!this.regex.test(inputValue)) {
        this.el.nativeElement.value = inputValue.slice(0, -1);
      }
    }
}