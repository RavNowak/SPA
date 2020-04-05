import { QuotationBuilder } from '../../common/QuotationBuilder';
import './home.scss';

const createCircleItem = (circleCss, secondary, href, info) => {
  const html = `<a href="${href}"><div class="circle ${circleCss}"></div></a>`

  $(`.${circleCss}`).ready(() => {
    $(`.${circleCss}`).mouseover(() => {
      $(`.${secondary}`).css("display", "block");
      $('.infoSpan').text(info);
    })

    $(`.${circleCss}`).mouseleave(() => {
      $(`.${secondary}`).css("display", "none");
    })
  })

  return html;
}

export const home = () => {
  const fragment = $(new DocumentFragment());

  const html = `
  <div class="homeBackground"></div>
  <div class="secondaryHotel"></div>
  <div class="secondaryServices"></div>
  <div class="secondaryContact"></div>
  <div class="secondaryBasket"></div>
  <div class="homeContainer">
    <div class="homeCenter">
    <span class="welcomeSpan">Welcome in IT SPA</span>
      <div class="circleContainer">
        ${createCircleItem('hotelCircle', 'secondaryHotel', 'hotel', 'Over 30 luxury apartments')}
        ${createCircleItem('serviceCircle', 'secondaryServices', 'services', 'Rich leisure offer')}
        ${createCircleItem('contactCircle', 'secondaryContact', 'contact', '24 hours a day service')}
        ${createCircleItem('basketCircle', 'secondaryBasket', 'basket', `Don't hesitate to be our guest`)}
      </div>
      <span class="infoSpan">We are one of the most luxurious hotel & spa in the world</span>
    </div>
  </div>`;

  fragment.append(html);

  const quatation = new QuotationBuilder();

  quatation.build(8000, 500);

  return fragment;
};
