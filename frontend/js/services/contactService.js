export const contactService = {
  getRooms: () => {
    return fetch('https://randomuser.me/api/').then(response => response.json());
  }
}