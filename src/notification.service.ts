import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { INotificationDto, NotificationDto } from './dto/notification.dto';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(private repository: NotificationRepository) {}

  async getAll(accountId: string): Promise<INotificationDto[]> {
    const result = await this.repository.getAll(accountId);
    return result?.map((not) => NotificationDto.parse(not));
  }

  async notifyAccountCreated(notification: INotificationDto): Promise<void> {
    await this.repository.notifyAccountCreated(
      notification as NotificationEntity,
    );
  }
}
