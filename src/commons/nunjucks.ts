import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as nunjucks from 'nunjucks';

const pathTemplates = resolve(__dirname, '../emails/html');

const getTemplate = (templateName): string | null => {
  try {
    const buffer: Buffer = readFileSync(`${pathTemplates}/${templateName}.html`);
    return buffer.toString('utf-8');
  } catch (e) {
    console.error('error to get template file', e.message);
    return null;
  }
  
}

const compile = (templateName: string, data: Object): string | null => {
  const template: string | null = getTemplate(templateName)

  if (!template) return null;

  return nunjucks.renderString(template, data);
}

export {
  getTemplate,
  compile,
};