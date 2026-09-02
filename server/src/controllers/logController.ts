import { Request, Response } from 'express';
import logger from '../utils/logger';

export const remoteLog = (req: Request, res: Response) => {
  const { level, message, metadata } = req.body;

  // 1. Validation du niveau (Whitelist)
  // On s'assure que le niveau est un des niveaux autorisés par Winston/Loggers
  const validLevels = ['info', 'warn', 'error', 'debug'];
  const sanitizedLevel = validLevels.includes(level) ? level : 'info';

  // 2. Nettoyage du message (Log Injection Prevention)
  // On supprime les retours à la ligne pour empêcher la falsification de logs
  const sanitizedMessage = typeof message === 'string' 
    ? message.replace(/[\n\r]/g, ' ') 
    : 'No message provided';

  // 3. On logue les données nettoyées
  logger.log(sanitizedLevel, sanitizedMessage, {
    ...metadata,
    service: 'orion-client',
    client_ip: req.ip,
    // Note : req.headers['user-agent'] est aussi une entrée utilisateur, 
    // mais Winston le gère généralement bien dans le JSON de métadonnées.
  });

  res.status(204).send();
};