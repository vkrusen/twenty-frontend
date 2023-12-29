import { DynamicModule, Global } from '@nestjs/common';

import { MessageQueueDriver } from 'src/integrations/message-queue/drivers/interfaces/message-queue-driver.interface';

import {
  MessageQueueDriverType,
  MessageQueueModuleAsyncOptions,
} from 'src/integrations/message-queue/interfaces';
import {
  QUEUE_DRIVER,
  MessageQueue,
} from 'src/integrations/message-queue/message-queue.constants';
import { PgBossDriver } from 'src/integrations/message-queue/drivers/pg-boss.driver';
import { MessageQueueService } from 'src/integrations/message-queue/services/message-queue.service';
import { BullMQDriver } from 'src/integrations/message-queue/drivers/bullmq.driver';
import { SyncDriver } from 'src/integrations/message-queue/drivers/sync.driver';
import { JobsModule } from 'src/integrations/message-queue/jobs.module';

@Global()
export class MessageQueueModule {
  static forRoot(options: MessageQueueModuleAsyncOptions): DynamicModule {
    const providers = [
      ...Object.values(MessageQueue).map((queue) => ({
        provide: queue,
        useFactory: (driver: MessageQueueDriver) => {
          return new MessageQueueService(driver, queue);
        },
        inject: [QUEUE_DRIVER],
      })),
      {
        provide: QUEUE_DRIVER,
        useFactory: async (...args: any[]) => {
          const config = await options.useFactory(...args);

          switch (config.type) {
            case MessageQueueDriverType.PgBoss:
              const boss = new PgBossDriver(config.options);

              await boss.init();

              return boss;

            case MessageQueueDriverType.BullMQ:
              return new BullMQDriver(config.options);

            default:
              return new SyncDriver(JobsModule.moduleRef);
          }
        },
        inject: options.inject || [],
      },
    ];

    return {
      module: MessageQueueModule,
      imports: [JobsModule, ...(options.imports || [])],
      providers,
      exports: [MessageQueue.taskAssignedQueue, MessageQueue.messagingQueue],
    };
  }
}
