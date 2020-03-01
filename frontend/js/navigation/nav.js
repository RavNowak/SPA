import '../../style/nav.scss';

const toogleMobileAndTabletIcon = () => {
  $(function() {
    $(".toggle").on("click", function() {
        if ($(".item").hasClass("active")) {
            $(".item").removeClass("active");
            $(this).find("a").html("<i class='fas fa-bars'></i>");
        } else {
            $(".item").addClass("active");
            $(this).find("a").html("<i class='fas fa-times'></i>");
        }
    });
  });
}

export const nav = () => {
    const fragment = $(new DocumentFragment());

    fragment
      .append(`
      <nav>
        <ul class="menu">
          <li class="logo"><a href="home">IT SPA </a>
            <i class="far fa-star star"></i>
            <i class="far fa-star star"></i>
            <i class="far fa-star star"></i>
            <i class="far fa-star star"></i>
            <i class="far fa-star star"></i>
          </li>
          <li class="item"><a href="home">Home</a></li>
          <li class="item"><a href="hotel">Hotel</a></li>
          <li class="item"><a href="services">Services</a></li>
          <li class="item"><a href="#">Opinions</a></li>
          <li class="item"><a href="#">Contact</a></li>
          <li class="item button"><a href="#">Log In</a></li>
          <li class="item button secondary"><a href="#">Sign Up</a></li>
          <li class="toggle"><a href="#"><i class="fas fa-bars"></i></a></li>
        </ul>
      </nav>`);

      toogleMobileAndTabletIcon();

    return fragment;
}

