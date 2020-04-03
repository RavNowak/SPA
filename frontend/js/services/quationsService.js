export const quationsService = {
  getQuations: () => {
    return fetch('https://itspa.herokuapp.com/quations').then(response => response.json());
  }
}