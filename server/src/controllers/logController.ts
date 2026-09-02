import { Request, Response } from 'express';
import logger from '../utils/logger';

export const remoteLog = (req: Request, res: Response) => {
  const { level, message, metadata } = req.body;

  // On ajoute un tag pour différencier les logs client des logs serveur
  logger.log(level || 'info', message, {
    ...metadata,
    service: 'orion-client', // Identification claire
    client_ip: req.ip,
    user_agent: req.headers['user-agent']
  });

  res.status(204).send();
};