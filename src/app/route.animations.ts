import { trigger, transition, style, animate, group, query } from '@angular/animations';
import { WorkOption } from './shared/model';

const animationAmt = '50vh';

function reduceVals(arr: string[]): string {
  return arr
    .map((value, index) => index < arr.length - 1 ? `${value} => ${arr[index + 1]}` : null)
    .filter(Boolean)
    .join(', ');
}
export const routeAnimations = trigger('routeAnimations', [
  transition(reduceVals(Object.values(WorkOption)), [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),

    group([
      query(':leave', [
        animate('700ms cubic-bezier(0.33, 1, 0.68, 1)',
          style({ opacity: 0, transform: `translateY(-${animationAmt})` }))
      ], { optional: true }),

      query(':enter', [
        style({ opacity: 0, transform: `translateY(${animationAmt})` }),
        animate('700ms 200ms cubic-bezier(0.33, 1, 0.68, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ], { optional: true })
    ])
  ]),

  transition(reduceVals(Object.values(WorkOption).reverse()), [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),

    group([
      query(':leave', [
        animate('700ms cubic-bezier(0.33, 1, 0.68, 1)',
          style({ opacity: 0, transform: `translateY(${animationAmt})` }))
      ], { optional: true }),

      query(':enter', [
        style({ opacity: 0, transform: `translateY(-${animationAmt})` }),
        animate('700ms 200ms cubic-bezier(0.33, 1, 0.68, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ], { optional: true })
    ])
  ])
]);
