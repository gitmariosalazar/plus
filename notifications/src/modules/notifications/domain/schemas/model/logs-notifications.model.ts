export class LogsNotificationsModel {
  private idLogsNotifications: number;
  private log: string;
  private message: string;
  private subject: string;
  private phone: string;
  private email: string;
  private module: string;
  private eventType: string;
  private userId?: number;
  private userEmail?: string;
  private ipAddress?: string;
  private userAgent?: string;
  private statusCode?: number;
  private kafkaTopic?: string;
  private correlationId?: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idLogsNotifications: number,
    log: string,
    message: string,
    subject: string,
    phone: string,
    email: string,
    module: string,
    eventType: string,
    userId?: number,
    userEmail?: string,
    ipAddress?: string,
    userAgent?: string,
    statusCode?: number,
    kafkaTopic?: string,
    correlationId?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idLogsNotifications = idLogsNotifications;
    this.log = log;
    this.message = message;
    this.subject = subject;
    this.phone = phone;
    this.email = email;
    this.module = module;
    this.eventType = eventType;
    this.userId = userId;
    this.userEmail = userEmail;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.statusCode = statusCode;
    this.kafkaTopic = kafkaTopic;
    this.correlationId = correlationId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getIdLogsNotifications(): number {
    return this.idLogsNotifications;
  }
  public setIdLogsNotifications(idLogsNotifications: number): void {
    this.idLogsNotifications = idLogsNotifications;
  }

  public getLog(): string {
    return this.log;
  }

  public setLog(log: string): void {
    this.log = log;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getSubject(): string {
    return this.subject;
  }

  public setSubject(subject: string): void {
    this.subject = subject;
  }

  public getPhone(): string {
    return this.phone;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getModule(): string {
    return this.module;
  }

  public setModule(module: string): void {
    this.module = module;
  }

  public getEventType(): string {
    return this.eventType;
  }

  public setEventType(eventType: string): void {
    this.eventType = eventType;
  }

  public getUserId(): number | undefined {
    return this.userId;
  }

  public setUserId(userId: number | undefined): void {
    this.userId = userId;
  }

  public getUserEmail(): string | undefined {
    return this.userEmail;
  }

  public setUserEmail(userEmail: string | undefined): void {
    this.userEmail = userEmail;
  }

  public getIpAddress(): string | undefined {
    return this.ipAddress;
  }

  public setIpAddress(ipAddress: string | undefined): void {
    this.ipAddress = ipAddress;
  }

  public getUserAgent(): string | undefined {
    return this.userAgent;
  }

  public setUserAgent(userAgent: string | undefined): void {
    this.userAgent = userAgent;
  }

  public getStatusCode(): number | undefined {
    return this.statusCode;
  }

  public setStatusCode(statusCode: number | undefined): void {
    this.statusCode = statusCode;
  }

  public getKafkaTopic(): string | undefined {
    return this.kafkaTopic;
  }

  public setKafkaTopic(kafkaTopic: string | undefined): void {
    this.kafkaTopic = kafkaTopic;
  }

  public getCorrelationId(): string | undefined {
    return this.correlationId;
  }

  public setCorrelationId(correlationId: string | undefined): void {
    this.correlationId = correlationId;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public toJSON(): object {
    return {
      idLogsNotifications: this.idLogsNotifications,
      log: this.log,
      message: this.message,
      subject: this.subject,
      phone: this.phone,
      email: this.email,
      module: this.module,
      eventType: this.eventType,
      userId: this.userId,
      userEmail: this.userEmail,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      statusCode: this.statusCode,
      kafkaTopic: this.kafkaTopic,
      correlationId: this.correlationId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
