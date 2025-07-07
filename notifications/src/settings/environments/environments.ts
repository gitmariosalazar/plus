import 'dotenv/config';
import * as joi from 'joi';

interface EnvironmentsVariables {
  PORT: number;
  DATABASE_PROVIDER: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_NAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOSTNAME: string;
  MONGODB_URI: string;
  DATABASE_URL: string;
  SECRET_KEY: string;
  SALT_ROUNDS: number;
  DOCUMENTS_SERVICE: string;
  DOCUMENTS_MICROSERVICE_HOST: string;
  DOCUMENTS_MICROSERVICE_PORT: number;
  EMAIL_HOST: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE_NUMBER: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  TWILIO_WHATSAPP_NUMBER: string;
  TWILIO_WHATSAPP_SID: string;
  TWILIO_WHATSAPP_TOKEN: string;
  CHANNELS: string;
  KAFKA_BROKER: string;
  NOTIFICATION_KAFKA_CLIENT: string;
  NOTIFICATION_KAFKA_GROUP_ID: string;
  NOTIFICATION_KAFKA_CLIENT_ID: string;
  DOCUMENTS_KAFKA_CLIENT: string;
  DOCUMENTS_KAFKA_GROUP_ID: string;
  DOCUMENTS_KAFKA_CLIENT_ID: string;
}

const environmentsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_PROVIDER: joi.string(),
    DATABASE_PORT: joi.string(),
    DATABASE_USERNAME: joi.string(),
    DATABASE_NAME: joi.string(),
    DATABASE_PASSWORD: joi.string(),
    DATABASE_HOSTNAME: joi.string(),
    MONGODB_URI: joi.string(),
    DATABASE_URL: joi.string(),
    SECRET_KEY: joi.string(),
    SALT_ROUNDS: joi.number(),
    DOCUMENTS_SERVICE: joi.string(),
    DOCUMENTS_MICROSERVICE_HOST: joi.string(),
    DOCUMENTS_MICROSERVICE_PORT: joi.number(),
    EMAIL_HOST: joi.string(),
    EMAIL_USERNAME: joi.string(),
    EMAIL_PASSWORD: joi.string(),
    TWILIO_ACCOUNT_SID: joi.string(),
    TWILIO_AUTH_TOKEN: joi.string(),
    TWILIO_PHONE_NUMBER: joi.string(),
    TELEGRAM_BOT_TOKEN: joi.string(),
    TELEGRAM_CHAT_ID: joi.string(),
    TWILIO_WHATSAPP_NUMBER: joi.string(),
    TWILIO_WHATSAPP_SID: joi.string(),
    TWILIO_WHATSAPP_TOKEN: joi.string(),
    CHANNELS: joi.string(),
    KAFKA_BROKER: joi.string().required(),
    NOTIFICATION_KAFKA_CLIENT: joi.string().required(),
    NOTIFICATION_KAFKA_GROUP_ID: joi.string().required(),
    NOTIFICATION_KAFKA_CLIENT_ID: joi.string().required(),
    DOCUMENTS_KAFKA_CLIENT: joi.string().required(),
    DOCUMENTS_KAFKA_GROUP_ID: joi.string().required(),
    DOCUMENTS_KAFKA_CLIENT_ID: joi.string().required(),
  })
  .unknown(true);

const { error, value } = environmentsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const environmentsVariables: EnvironmentsVariables = value;
export const environments = {
  serverPort: environmentsVariables.PORT,
  databasePort: environmentsVariables.DATABASE_PORT,
  databaseProvider: environmentsVariables.DATABASE_PROVIDER,
  databaseUsername: environmentsVariables.DATABASE_USERNAME,
  databaseName: environmentsVariables.DATABASE_NAME,
  databaseHostname: environmentsVariables.DATABASE_HOSTNAME,
  databasePassword: environmentsVariables.DATABASE_PASSWORD,
  mongodbURI: environmentsVariables.MONGODB_URI,
  databaseURL: environmentsVariables.DATABASE_URL,
  secretKey: environmentsVariables.SECRET_KEY,
  saltRound: environmentsVariables.SALT_ROUNDS,
  documentsService: environmentsVariables.DOCUMENTS_SERVICE,
  documentsMicroserviceHost: environmentsVariables.DOCUMENTS_MICROSERVICE_HOST,
  documentsMicroservicePort: environmentsVariables.DOCUMENTS_MICROSERVICE_PORT,
  emailHost: environmentsVariables.EMAIL_HOST,
  emailUsername: environmentsVariables.EMAIL_USERNAME,
  emailPassword: environmentsVariables.EMAIL_PASSWORD,
  twilioAccountSID: environmentsVariables.TWILIO_ACCOUNT_SID,
  twilioAuthToken: environmentsVariables.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: environmentsVariables.TWILIO_PHONE_NUMBER,
  telegramBotToken: environmentsVariables.TELEGRAM_BOT_TOKEN,
  telegramChatId: environmentsVariables.TELEGRAM_CHAT_ID,
  twilioWhatsappNumber: environmentsVariables.TWILIO_WHATSAPP_NUMBER,
  twilioWhatsappSID: environmentsVariables.TWILIO_WHATSAPP_SID,
  twilioWhatsappToken: environmentsVariables.TWILIO_WHATSAPP_TOKEN,
  channels: environmentsVariables.CHANNELS,
  kafkaBroker: environmentsVariables.KAFKA_BROKER,
  notificationKafkaClient: environmentsVariables.NOTIFICATION_KAFKA_CLIENT,
  notificationKafkaGroupId: environmentsVariables.NOTIFICATION_KAFKA_GROUP_ID,
  notificationKafkaClientId: environmentsVariables.NOTIFICATION_KAFKA_CLIENT_ID,
  documentsKafkaClient: environmentsVariables.DOCUMENTS_KAFKA_CLIENT,
  documentsKafkaGroupId: environmentsVariables.DOCUMENTS_KAFKA_GROUP_ID,
  documentsKafkaClientId: environmentsVariables.DOCUMENTS_KAFKA_CLIENT_ID,
};
