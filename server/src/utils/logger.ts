import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'orion-api', env: process.env.NODE_ENV },
  transports: [
    new winston.transports.Console(),
    // Envoi à Logstash
    new winston.transports.Http({
      host: process.env.LOGSTASH_HOST || 'localhost',
      port: Number(process.env.LOGSTASH_PORT) || 8081,
      path: '/',
      ssl: false
    })
  ],
});

export default logger;