import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import config from '../../config/config';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
const OAuth2 = google.auth.OAuth2;


const oAuth2Client = new OAuth2(
  config.email.clientId,
  config.email.clientSecret,
  'https://developers.google.com/oauthplayground',
);

oAuth2Client.setCredentials({
  refresh_token: config.email.refereshToken,
});


const createTransport = async () => {
  const accessToken =  (await oAuth2Client.getAccessToken()).token ?? '';

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      clientId: config.email.clientId,
      clientSecret: config.email.clientSecret,
      refreshToken: config.email.refereshToken,
      user: config.email.address,
      accessToken,
    }
  });

  return transport;
};



export const sendMail = async (options: MailOptions): Promise<void> => {
  const emailTransport = await createTransport();
  await emailTransport.sendMail(options);
};