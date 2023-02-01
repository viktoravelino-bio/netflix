import axios from 'axios';
import { apiKey, baseUrl } from '../constants';

export const api = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: apiKey,
  },
});
