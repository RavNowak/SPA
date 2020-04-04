import './nav.scss';

const toogleMobileAndTabletIcon = () => {
  $(function () {
    $(".toggle").on("click", function () {
      if ($(".item").hasClass("active")) {
        $(".item").removeClass("active");

        $(this).find("a").html("<i class='fas fa-bars'></i>");
      } else {
        $(".item").addClass("active");

        $(this).find("a").html("<i class='fas fa-times'></i>");
      }
    })
  })
}

const createLogOutButton = () => {
  const html = `<li class="item power" id="logOutButton"><a><i class="fas fa-power-off"></i></a></li>`;

  const isLoggedIn = Cookies.get('isloggedin');

  $('#logOutButton').ready(() => {
    $('#logOutButton').click(() => {
      Cookies.set('isloggedin', 'false');
      location.reload();
    })
  })

  if (isLoggedIn === 'true') {
    return html;
  }

  return '';
}

export const nav = () => {
  const fragment = $(new DocumentFragment());

  const html = `
  <nav>
    <ul class="menu">
      <li class="logo"><a href="home">IT SPA </a>
        <i class="far fa-star star"></i>
        <i class="far fa-star star"></i>
        <i class="far fa-star star"></i>
        <i class="far fa-star star"></i>
        <i class="far fa-star star"></i>
      </li>
      <li class="item"><a href="/SPA/home">Home</a></li>
      <li class="item"><a href="/SPA/hotel">Hotel</a></li>
      <li class="item"><a href="/SPA/services">Services</a></li>
      <li class="item"><a href="SPA/contact">Contact</a></li>
      <li class="item button"><a href="/SPA/basket"><i class="fas fa-shopping-basket"></i></a></li>
      ${createLogOutButton()}
      <li class="toggle"><a href="#"><i class="fas fa-bars"></i></a></li>
    </ul>
  </nav>`

  fragment.append(html);

  toogleMobileAndTabletIcon();

  return fragment;
}