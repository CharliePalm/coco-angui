import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../../shared/model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private toastId = 0;

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) {
    const id = this.toastId++;
    const toast: Toast = { message, type, id };
    this.toastsSubject.next([...this.toastsSubject.value, toast]);

    setTimeout(() => this.removeToast(id), duration);
  }

  private removeToast(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter(toast => toast.id !== id));
  }
}
