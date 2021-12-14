import { HASHING_SECRET } from '../../credentials/configs';

const crypto = require('crypto');

export const hashString = (str: string) => crypto.createHmac('sha256', HASHING_SECRET).update(str).digest('hex');
