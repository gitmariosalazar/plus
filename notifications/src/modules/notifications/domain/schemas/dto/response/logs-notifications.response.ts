export interface LogsNotificationsResponse {
  idLogsNotifications: number;
  log: string;
  message: string;
  subject: string;
  phone: string;
  email: string;
  module: string;
  eventType: string;
  userId?: number;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  statusCode?: number;
  kafkaTopic?: string;
  correlationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
