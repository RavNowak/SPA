import { QuotationBuilder } from '../../common/QuotationBuilder';
import intro from '../../../assets/video/intro.mp4';
import './home.scss';

const createVideo = () => {
  const video = $('<video/>', {
    class: 'homeIntro',
    src: intro,
    type: 'video/mp4',
    controls: false,
    loop: true,
    autoplay: true,
    muted: true,
  });

  return video;
}

export const home = () => {
  const fragment = $(new DocumentFragment());

  const html = `<div class="homeContainer"></div>`;

  fragment.append(createVideo())
          .append(html);

  const quatation = new QuotationBuilder();

  quatation.build(8000, 500);

  return fragment;
};
