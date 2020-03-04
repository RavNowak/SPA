import { Cookie } from '../common/Cookie';
import '../../style/services.scss';
import { treatmentService } from '../services/treatmentsService';
import { Offers } from '../common/Offers';

const TagCloud = require('TagCloud');

let offers = new Offers;

const createSphere = () => {
  const tags = [];

  const settings = {
    radius: 210,
    maxSpeed: 'normal',
    initSpeed: 'slow',
    direction: 135,
    keep: true
  }

  treatmentService.getServices().then((services) => {
   
    offers.setRemote(services);

    for (let service of services) {
      tags.push(service.name);
    }

    $('.sphere').ready(() => {
      TagCloud('.sphere', tags, settings);
    
      $('.tagcloud--item').click(function() {console.log($(this).text())});
    })
  });
}

export const services = () =>
{
  const fragment = $(new DocumentFragment());

  const html = `
  <div class="backgroundServices"></div>
  <div class="servicesShadow"></div>
  <div class="servicesContainer">
    <div class="sphere"></div>

    <div class="singleService"></div>
  </div>
  `

  fragment.append(html);

  createSphere();

  return fragment;
};
