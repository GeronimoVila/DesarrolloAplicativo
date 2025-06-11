import { URL_BASE } from "../config/URLs.js";

export const Api = {
  defaultHeaders: {
    'Content-Type': 'application/json',
  },

  fetch: async (service, options) => {
    options = { headers: {}, ...options };
    options.headers = { ...Api.defaultHeaders, ...options.headers };

    const token = sessionStorage.getItem('token');

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (options.body && typeof options.body !== "string") {
      options.body = JSON.stringify(options.body);
    }
    return fetch(`${URL_BASE}/${service}`, options);
  },

  get: async (service, options) => {
    return Api.fetch(service, { ...options, method: "GET" });
  },

  post: async (service, options) => {
    return Api.fetch(service, { ...options, method: "POST" });
  },
};