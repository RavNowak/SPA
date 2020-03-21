export const authService = {
  auth: (email, password) => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(email + ":" + password));

    return fetch('http://localhost:8080/auth',{ method:'POST', headers: headers }).then(response => response.json());
  }
}