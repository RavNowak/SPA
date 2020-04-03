export const quationsService = {
  getQuations: () => {
    return fetch('http://localhost:8080/quations').then(response => response.json());
  }
}