import { origin } from './origin';

export const treatmentService = {
    getServices: () => {
      return fetch(origin + '/services').then(response => response.json());
    }
}