import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { INotificationDto } from './dto/notification.dto';

@Controller()
export class NotificationController {
  constructor(private service: NotificationService) {}

  @MessagePattern('get-account-notification')
  async getAllNotifications(accountId: { accountId: string }) {
    return await this.service.getAll(accountId.accountId);
  }

  @EventPattern('account-create')
  async notifyAccountCreated(notification: INotificationDto) {
    await this.service.notifyAccountCreated(notification);
  }
}
