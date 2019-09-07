import * as MAILGUN from 'mailgun-js';
import {messages} from "mailgun-js";

interface HeaderMailgun {
  to: string,
  subject: string,
  template: string
}

const mailgun = MAILGUN({
  apiKey: process.env.MAILGUN_API_KEY || 'not-found',
  domain: process.env.MAILGUN_API_BASEURL || 'not-found',
});

const sendMessage = ({to, subject, template}: HeaderMailgun, data = {}): Promise<messages.SendResponse> => {
  const info = {
    from: `Pedro Oliveira <${process.env.MAILGUN_API_BASEURL}>`,
    to,
    subject,
    template,
  };

  return new Promise<messages.SendResponse>(async (resolve, reject) => {
    await mailgun.messages().send(info, ((error, body) => {
      if (error) {
        console.error('mailgun error', error);
        reject(error);
        return;
      }

      console.log('mailgun success', body);
      resolve(body);
    }))
  });
};

export {
  sendMessage,
};
