import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private animationsStartedSubject = new BehaviorSubject<boolean>(false);
  public animationsStarted$: Observable<boolean> = this.animationsStartedSubject.asObservable();

  constructor() { }

  startAnimations(): void {
    this.animationsStartedSubject.next(true);
  }

  get animationsStarted(): boolean {
    return this.animationsStartedSubject.value;
  }
}