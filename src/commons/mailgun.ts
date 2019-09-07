import * as MAILGUN from 'mailgun-js';
import { messages } from 'mailgun-js';

interface HeaderMailgun {
  to: string;
  subject: string;
  html: string;
}

const mailgun = MAILGUN({
  apiKey: process.env.MAILGUN_API_KEY || 'not-found',
  domain: process.env.MAILGUN_DOMAIN || 'not-found',
});

const textDomain = `Pedro Oliveira <pedro@${process.env.MAILGUN_DOMAIN}>`;

const sendMessage = ({ to, subject, html }: HeaderMailgun, data = {}): Promise<messages.SendResponse> => {
  const info = {
    from: textDomain,
    to,
    subject,
    html,
  };

  return new Promise<messages.SendResponse>((resolve, reject) => {
    mailgun.messages().send(info, ((error, body) => {
      if (error) {
        console.error('mailgun error', error);
        reject(error);
        return;
      }

      console.log('mailgun success', body);
      resolve(body);
    }));
  });
};

export {
  mailgun,
  sendMessage,
};
