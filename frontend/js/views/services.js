import { Cookie } from '../common/Cookie';
import '../../style/services.scss';
import { treatmentService } from '../services/treatmentsService';
import { Offers } from '../common/Offers';

const TagCloud = require('TagCloud');

let offers = new Offers;

const createSphere = () => {
  const html = `<div class="sphere"></div>`;
  const tags = [];

  const settings = {
    radius: 210,
    maxSpeed: 'slow',
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

      $('.tagcloud--item').click(function () {
        let service = getServiceObject($(this).text());

        $('.singleService').empty();

        $('.singleService').hide()
          .append(createServiceName(service))
          .append(createServiceInfo(service))
          .append(createServiceDescription(service))
          .append(createServiceButton())
          .slideDown('500');
      });
    })
  });

  return html;
}

const getServiceObject = (name) => {
  for (let offer of offers.getRemote()) {
    if (offer.name === name) {
      return offer;
    }
  }
}

const createServiceName = (service) => {
  const html = `<div id="serviceName">${service.name}</div>`;

  $('#serviceName').ready(() => {
    $('#serviceName').css({
      "text-align": "center",
      "font-weight": "600"
    });
  });

  return html;
}

const createServiceInfo = (service) => {
  const html = `<div class ="serviceInfo"></div>`;

  $('.serviceInfo').ready(() => {
    $('.serviceInfo')
      .append(`<div style="margin-bottom:15px;">Price: ${service.price}$</div>`)
      .append(`<div style="margin-bottom:15px;">Time: ${service.time} min</div>`)
      .append(`<div>Area: ${service.area}</div>`);
  });

  return html;
}

const createServiceDescription = (service) => {
  const html = `<div id="serviceDescription">"${service.description}"</div>`;

  $('#serviceDescription').ready(() => {
    $('#serviceDescription').css({
      "text-align": "center",
      "font-style": "italic"
    });
  });

  return html;
}

const createSingleServiceInfo = () => {
  const html = `<div class="singleService"></div>`;

  $('.singleService').ready(() => {
    const info = `<div id="initMessage">Choose the treatment you are interested in</div>`;

    $('#initMessage').ready(() => {
      $('#initMessage').css({"text-align":"center", 
      "font-weight":"600"})
    })

    $('.singleService').append(info);
  });

  return html;
}

const createServiceButton = () => {
  const html = `<button type="button" class="serviceButton">Want it !</button>`;

  return html;
}

export const services = () => {
  const fragment = $(new DocumentFragment());

  const html = `
  <div class="backgroundServices"></div>
  <div class="servicesShadow"></div>
  <div class="servicesContainer">
    <div class="mainPanel">
      ${createSphere()}
      ${createSingleServiceInfo()}
    </div>
  </div>`

  fragment.append(html);

  return fragment;
};
