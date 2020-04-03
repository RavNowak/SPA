export const roomService = {
    getRooms: () => {
      return fetch('https://itspa.herokuapp.com/rooms').then(response => response.json());
    }
}