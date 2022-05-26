export enum MailJobsEnum {
  PasswordReset = 'password-reset',
  UserConfirmation = 'user-confirmation',
}

export type MailJob = 'password-reset' | 'user-confirmation';
