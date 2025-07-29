import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
    selector: 'app-dynamic-button',
    templateUrl: './dynamic-button.component.html',
    styleUrls: ['./dynamic-button.component.scss'],
    standalone: false
})
export class DynamicButtonComponent {
  @Input() text: string = '';
  @Input() href: string = '';
  @Input() target: string = '_blank';
  @Input() analyticsEvent: string = '';
  @Input() analyticsCategory: string = '';
  @Input() analyticsLabel: string = '';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'default' | 'small' = 'default';

  @Output() buttonClick = new EventEmitter<Event>();

  constructor(public analyticsService: AnalyticsService) {}

  onButtonClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    // Enviar evento de analytics si está configurado
    if (this.analyticsEvent && this.analyticsCategory && this.analyticsLabel) {
      this.analyticsService.sendAnalyticEvent(
        this.analyticsEvent,
        this.analyticsCategory,
        this.analyticsLabel
      );
    }

    // Emitir evento personalizado
    this.buttonClick.emit(event);
  }
}
