import intro from '../../assets/video/intro.mp4';
import { QuotationBuilder } from '../common/QuotationBuilder'

const createVideo = () => {
  const video = $('<video />', {
    class: 'homeIntro',
    src: intro,
    type: 'video/mp4',
    controls: false,
    loop: true,
    autoplay: true
  });

  return video;
}

export const home = () => {
  const fragment = $(new DocumentFragment());

  fragment.append(createVideo());

  const quotation = new QuotationBuilder();

  fragment.append(quotation.build(8000, 500));

  return fragment;
};
