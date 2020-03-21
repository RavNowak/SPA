export const accountService = {
    create: (name, surname, email, tel, pass) => {
      let headers = new Headers();
  
      headers.append('Content-Type', 'application/json');

      const user = {
          name: name,
          surname: surname,
          tel: tel,
          email: email,
          password: pass,
      }
  
      return fetch('http://localhost:8080/create',{ method:'POST', headers: headers, body: JSON.stringify({user: user}) }).then(response => response.json());
    }
}
    