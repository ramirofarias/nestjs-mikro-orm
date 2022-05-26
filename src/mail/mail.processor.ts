import {
  OnGlobalQueueCompleted,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { MailJobsEnum } from './mail-job.types';
import { MailService } from './mail.service';

@Processor('mailsend')
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    console.log('(Global) on completed');
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processor:@OnQueueActive - Processing job ${job.id} of type ${
        job.name
      }. Data: ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(
      `Processor:@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error) {
    console.log(
      `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process(MailJobsEnum.PasswordReset)
  async sendPasswordResetEmail(job: Job) {
    await this.mailService.sendPasswordResetEmail(job.data.email, job.data.url);
  }
}
