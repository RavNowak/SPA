export const treatmentService = {
    getServices: () => {
      return fetch('http://localhost:8080/services').then(response => response.json());
    }
}