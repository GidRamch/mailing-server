import { body, ValidationChain } from 'express-validator';


const rules: Record<string, ValidationChain[]> = {
  sendMail: [
    body('from', 'You must provide a valid FROM email!').exists(),
    body('from', 'You must provide a valid FROM email!').isEmail({allow_display_name: true}),

    body('to', 'You must provide an array of recipient emails!').exists(),
    body('to', 'You must provide an array of recipient emails!').isArray({ min: 1 }),

    body('subject', 'You must provide an email subject!').exists(),
    body('subject', 'You must provide a valid email subject!').isString(),
  ],
};


export const getMailingValidationRules = (method: string): ValidationChain[] => rules[method];