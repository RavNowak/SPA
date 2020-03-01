export class Cookie
{
  static setCookie(cookieName, cookieValue)
  {
    document.cookie = cookieName + "=" + cookieValue + ";";
  }

  static getCookie(cookieName)
  {
    const name = cookieName + "=";
    const cookies = decodeURIComponent(document.cookie).split(';');

    for (let i = 0; i < cookies.length; i++)
    {
      let cookie = cookies[ i ];
      while (cookie.charAt(0) == ' ')
      {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0)
      {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }
}