import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notificationsService: NotificationsService) { }

  showSuccess(message: string) {
    this.notificationsService.success(message, null, { theClass: 'success-notification' });
  }

  showInfo(message: string) {
    this.notificationsService.info(message);
  }

  showWarning(message: string) {
    this.notificationsService.warn(message);
  }

  showError(message: string) {
    this.notificationsService.error(message);
  }


}
