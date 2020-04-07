import { origin } from './origin';

export const authService = {
  auth: (email, password) => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    
    return fetch(origin + '/auth',{ method:'POST',
                                    credentials: 'include',
                                    headers: headers,
                                    body: JSON.stringify({ 
                                        email,
                                        password 
                                      })
                                    }).then(response => response.json());
  }
}