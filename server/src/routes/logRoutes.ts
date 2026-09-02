import { Router } from 'express';
import { remoteLog } from '../controllers/logController';

const router = Router();

router.post('/', remoteLog);

export default router;
