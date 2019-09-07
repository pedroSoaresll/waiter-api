import { Server } from 'http';
import { AddressInfo } from 'net';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const normalizePort = (val: number | string): number | string | boolean => {
  const port: number = (typeof val === 'string') ? parseInt(val) : val;
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

export const onError = (server: Server) => (error: NodeJS.ErrnoException): void => {
  const addressInfo: AddressInfo = <AddressInfo>server.address();
  const { port } = addressInfo;

  if (error.syscall !== 'listen') throw error;
  const bind = (typeof port === typeof '') ? `pipe ${port}` : `port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export const onListening = (server: Server) => (): void => {
  const addr = <AddressInfo>server.address();
  const bind = (typeof addr === typeof '') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening at ${bind}...`);
};

export const { JWT_SECRET } = process.env;

export const compareStringBcrypt = (passwordReceived: string, passwordStored: string): boolean => {
  if (!passwordReceived || !passwordStored) return false;
  return compareSync(passwordReceived, passwordStored);
};

export const generatePassword = (password) => {
  const saltRounds = 10;
  const saltGenerated = genSaltSync(saltRounds);
  return hashSync(password, saltGenerated);
};
