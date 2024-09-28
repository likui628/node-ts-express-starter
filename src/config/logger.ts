import winston from 'winston'
import 'winston-daily-rotate-file'

const transport = new winston.transports.DailyRotateFile({
  level: process.env.LOG_LEVEL || 'info',
  filename: process.env.LOG_FILE_PATH || 'logs/%DATE%.log',
  datePattern: process.env.LOG_DATE_PATTERN || 'YYYY-MM-DD-HH',
  zippedArchive: process.env.LOG_ZIPPED_ARCHIVE === 'true',
  maxSize: process.env.LOG_MAX_SIZE || '20m',
  maxFiles: process.env.LOG_MAX_FILES || '14d',
})

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    process.env.NODE_ENV === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [transport, new winston.transports.Console()],
})
