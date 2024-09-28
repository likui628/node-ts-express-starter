import winston from 'winston'
import 'winston-daily-rotate-file'

const transport = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
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
