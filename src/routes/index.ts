import * as express from 'express';

import clientRoute from './client/client.route';

const router = express.Router();

router.use('/health', router.get('', async (_req, res, _next) => {
  return res.status(200).json({
    message: 'ok'
  });
}));

router.use('/clientes', clientRoute);

export default router;
