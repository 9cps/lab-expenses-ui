import axios from 'axios';

import { getApiBaseUrl } from './config';

/**
 * Shared axios instance pre-configured with the active API base URL.
 *
 * Centralising the client means every request reuses the same baseURL,
 * headers and (future) interceptors instead of each component re-deriving
 * the endpoint and concatenating strings by hand.
 */
export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});
