// @ts-ignore
import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, label, printf, colorize,
} = format;

export default (module) => {
  const formatter = printf((info) => {
    const colorizer = format.colorize();
    let stack = '';
    if (info.meta) {
      if (info.meta.stack) {
        stack += `\n${info.meta.stack}`;
        info.meta.stack = undefined;
      }
      if (info.meta.errorStack) {
        if (stack !== '') {
          stack += '\n';
        }
        stack += info.meta.errorStack;
        info.meta.errorStack = undefined;
      }
    }
    const _info = (a) => {
      if (Object.keys(a).length) {
        delete a.level;
        delete a.message;
        delete a.label;
        delete a.timestamp;
      }
      return a;
    };
    if (process.env.SLS_STAGE === 'dev') {
      return (
        `\n${info.label.toUpperCase().replace('.', ':')}: ${
          colorizer.colorize(
            info.level,
            `${info.message ? info.message : ''
            } ${
              info.meta && Object.keys(info.meta).length
                ? `\n${JSON.stringify(info.meta, null, 2)}`
                : ''
            }${!info.meta && Object.keys(_info(info)).length
              ? `\n${JSON.stringify(_info(info), null, 2)}`
              : ''
            }${stack}`,
          )}`
      );
    }
    return (
      `\n${info.label.toUpperCase().replace('.', ':')}: ${
        info.message ? info.message : ''
      } ${
        info.meta && Object.keys(info.meta).length
          ? `\n${JSON.stringify(info.meta, null, 2)}`
          : ''
      }${!info.meta && Object.keys(_info(info)).length
        ? `\n${JSON.stringify(_info(info), null, 2)}`
        : ''
      }${stack}`
    );
  });

  // const S3Stream = new S3StreamLogger({
  //   bucket: 'logs.kovi.us',
  //   folder: 'api/' + module.split(':')[0] + '/' + Moment().format('YYYY/MM/DD'),
  // });

  const logger = createLogger({
    level: 'info',
    format: combine(
      format.label({ label: module }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      formatter,
    ),
    exitOnError: false,
  });
  if (process.env.SLS_STAGE === 'dev') {
    logger.add(
      new transports.Console({
        level: 'silly',
        handleExceptions: true,
      }),
    );
  } else {
    logger.add(
      new transports.Console({
        level: 'info',
        handleExceptions: true,
      }),
      // new transports.File({
      //   level: 'info',
      //   handleExceptions: true,
      //   json: true,
      //   timestamp: true,
      //   colorize: false,
      //   stream: S3Stream,
      // })
    );
  }
  return logger;
};
