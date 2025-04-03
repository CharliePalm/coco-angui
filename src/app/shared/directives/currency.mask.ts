import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[currency]' // Directive name
})
export class CurrencyMaskDirective {
  private regex: RegExp = new RegExp('^\\d*(\\.\\d{0,2})?$'); // Matches numbers with up to two decimal places

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let inputValue = this.el.nativeElement.value;

    // Step 1: Remove any non-numeric characters except the decimal point
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Step 2: Ensure only one decimal point is allowed
    const decimalIndex = inputValue.indexOf('.');
    if (decimalIndex !== -1) {
      // Limit to 2 decimal places
      inputValue = inputValue.slice(0, decimalIndex + 3); 
    }

    // Step 3: Format as currency (e.g., 1000 -> 1,000)
    let [integer, decimal] = inputValue.split('.');

    // Add commas to the integer part (thousands separators)
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Step 4: Combine the integer and decimal parts
    if (decimal) {
      inputValue = `${integer}.${decimal}`;
    } else {
      inputValue = integer;
    }

    // Apply the formatted value back to the input
    this.el.nativeElement.value = inputValue;
  }
}
