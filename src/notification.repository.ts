import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private repository: Repository<NotificationEntity>,
  ) {}

  async getAll(accountId: string): Promise<NotificationEntity[]> {
    const result = await this.repository.find({
      where: { accountId },
      order: {
        createdAt: 'DESC',
      },
    });
    return result;
  }

  async notifyAccountCreated(notification: NotificationEntity): Promise<void> {
    const notificationCreated = this.repository.create(notification);
    await this.repository.save(notificationCreated);
  }
}
