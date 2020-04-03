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
  
      return fetch('https://itspa.herokuapp.com/create',{ method:'POST', headers: headers, body: JSON.stringify({user: user}) }).then(response => response.json());
    }
}
    