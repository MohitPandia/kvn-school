export type NotificationEvent = "admission-enquiry";

export type NotificationMessage = {
  title: string;
  lines: string[];
};

export type NotificationPayload = {
  event: NotificationEvent;
  submittedAt: string;
  message: NotificationMessage;
  metadata?: Record<string, string>;
};

export type NotificationResult = {
  provider: string;
  ok: boolean;
  error?: string;
};

export interface NotificationProvider {
  readonly name: string;
  send(payload: NotificationPayload): Promise<void>;
}
