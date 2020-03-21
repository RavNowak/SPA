import './home.scss';
import intro from '../../../assets/video/intro.mp4';
import { QuotationBuilder } from '../../common/QuotationBuilder';

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

  fragment.append(createVideo())
          .append(new QuotationBuilder().build(8000, 500));

  return fragment;
};
