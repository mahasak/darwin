import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
} from './common';

import { handleAPIDocs } from './swagger';
import { handleRateLimit, handleHTTPHeaders, handleCSRF } from './security';
import { handleLogging } from './logging';

export default [
  handleAPIDocs,
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
  handleRateLimit,
  handleHTTPHeaders,
  handleCSRF,
  handleLogging,
];