import winston from "winston";

export interface Logger {
  error(message: string, meta?: object): void;
}

export interface LoggerService {
  logger: Logger,
}

export class WinstonLoggerService implements LoggerService {
  logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.prettyPrint(),
          winston.format.printf(info => {
            return `[${info.timestamp}] ${info.level}: ${info.message}`;
          })
        )
      })
    ]
  })
}