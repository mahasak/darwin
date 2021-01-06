import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
} from './common';


import { handleRateLimit, handleHTTPHeaders, handleCSRF } from './security';

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
  handleRateLimit,
  handleHTTPHeaders,
  handleCSRF,
];