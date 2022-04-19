import { IHttpLoggerProps } from '../types';

const { createLogger, transports, format } = require('winston');

const { combine, timestamp, json } = format;

const loggerOptions = {
  req: {
    filename: 'http-req.log',
    level: 'http',
    colorize: true,
  },
  res: {
    filename: 'http-res.log',
    level: 'http',
    colorize: true,
  },
  err: {
    filename: 'http-err.log',
    level: 'error',
    colorize: true,
  },
};

export const httpLogFormat = combine(
  timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  json()
);

const httpReqLogger = createLogger({
  format: httpLogFormat,
  transports: [new transports.File(loggerOptions.req)],
});

const httpResLogger = createLogger({
  format: httpLogFormat,
  transports: [new transports.File(loggerOptions.res)],
});

const httpErrLogger = createLogger({
  format: httpLogFormat,
  transports: [new transports.File(loggerOptions.err)],
});

if (process.env.NODE_ENV !== 'production') {
  httpReqLogger.add(
    new transports.Console({
      ...loggerOptions.req,
      format: httpLogFormat,
    })
  );

  httpResLogger.add(
    new transports.Console({
      ...loggerOptions.res,
      format: httpLogFormat,
    })
  );

  httpErrLogger.add(
    new transports.Console({
      ...loggerOptions.err,
      format: httpLogFormat,
    })
  );
}

export const logHttpData = ({ err, req, res }: IHttpLoggerProps) => {
  if (err) {
    httpErrLogger.http(`${err.method} ${err.statusCode} ${err.status} - ${err.message}`);
  }
  if (req) {
    httpReqLogger.http(
      `${req.method} ${req.protocol}://${req.hostname}:${
        req.socket.localPort + req.originalUrl
      } queryParams:${JSON.stringify(req.query)} body:${JSON.stringify(req.body)}`
    );
  }
  if (res) {
    httpResLogger.http(
      `${res.req.method} ${res.req.protocol}://${res.req.hostname}:${
        res.req.socket.localPort + res.req.originalUrl
      } body:${JSON.stringify(res.req.body)}`
    );
  }
};
