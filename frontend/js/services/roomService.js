import { origin } from './origin';

export const roomService = {
    getRooms: () => {
      return fetch(origin + '/rooms').then(response => response.json());
    }
}