import { z } from 'zod';

export const NotificationDto = z.object({
  id: z.string().optional(),
  accountId: z.string().min(1, 'accountId is required'),
  title: z.string().min(1, 'title is required'),
  message: z.string().nullish(),
  viewed: z.boolean(),
});

export type INotificationDto = z.infer<typeof NotificationDto>;
