export const treatmentService = {
    getServices: () => {
      return fetch('https://itspa.herokuapp.com/services').then(response => response.json());
    }
}