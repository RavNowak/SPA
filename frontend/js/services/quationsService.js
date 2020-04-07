import { origin } from './origin';

export const quationsService = {
  getQuations: () => {
    return fetch(origin + '/quations').then(response => response.json());
  }
}