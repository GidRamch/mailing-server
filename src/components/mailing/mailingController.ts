import express, { NextFunction, Request, Response } from 'express';

import { sendMail } from '../../services/mailing';
import { logger } from '../../services/logger';
import { getMailingValidationRules } from './mailingValidator';
import { validate } from '../../middleware/validator';

const router = express.Router();


router.post(
  '/sendMail',
  getMailingValidationRules('sendMail'),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info('POST /sendMail');

    try {
      const { from, to, cc, bcc, subject, text, html, attachments } = req.body;

      await sendMail({ from, to, cc, bcc, subject, text, html, attachments });
      
      res.status(200).send();
    } catch (err) { next(err); }
  }
);

export default router;