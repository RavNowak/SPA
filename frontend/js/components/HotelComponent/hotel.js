import { Offers } from '../../common/Offers';
import { InfoBox } from '../../common/PopUpBox';
import { roomService } from '../../services/roomService';
import './hotel.scss';

let offers = new Offers;

const createQuantityBox = (title) => {
  const html = `
    <div class="quantityBox">
      <span class="settingTitle">${title}</span>
      <input type="number" min="1" max="6" step="1" value="1" style="font-size:16px;">
        <div class="quantity-nav">
          <div class="quantity-button-plus"><i class="fas fa-plus-square fa-lg"></i></div>
          <div class="quantity-button-minus"><i class="fas fa-minus-square fa-lg"></i></div>
        </div>
    </div>`;

  $('.quantityBox').ready(() => {
    const spinner = $('.quantityBox'),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find('.quantity-button-plus'),
      btnDown = spinner.find('.quantity-button-minus'),
      min = input.attr('min'),
      max = input.attr('max');

    btnUp.click(() => {
      const oldValue = parseFloat(input.val());
      let newValue = oldValue;

      if (oldValue < max) {
        newValue = oldValue + 1;
      }

      spinner.find("input").val(newValue);
      spinner.find("input").trigger("change");

      drawMatchedOffer(0);
    })

    btnDown.click(() => {
      const oldValue = parseFloat(input.val());
      let newValue = oldValue;

      if (oldValue > min) {
        newValue = oldValue - 1;
      }

      spinner.find("input").val(newValue);
      spinner.find("input").trigger("change");

      drawMatchedOffer(0);
    })
  })

  return html;
}

const createCheckBoxSetting = (title) => {
  const html = `
    <div class="checkBoxSetting" id="checkBoxSetting${title}">
      <span class="checkBoxTittle" id="${title}Title">${title}</span>
      <div class="coolCheckBox">  
        <input type="checkbox" value="None" id="${title}" name="${title}" unchecked>
        <label for="${title}"></label>
      </div>
    </div>`;

  $(document).on('click', `#checkBoxSetting${title}`, () => {
    const checkBoxState = $(`#${title}`).prop("checked");

    $(`#${title}`).prop("checked", !checkBoxState);

    if ($(`#${title}`).is(':checked')) {
      $(`#${title}Title`).css({ 'color': 'white' });
      $(`#checkBoxSetting${title}`).css({ 'background-color': 'rgba(30, 137, 199, 0.212)' });
    }
    else {
      $(`#${title}Title`).css({ 'color': 'rgba(255, 255, 255, 0.589)' },
        { 'transition': 'color .10s ease-in-out' });
      $(`#checkBoxSetting${title}`).css({ 'background-color': '' });
    }

    drawMatchedOffer(0);
  })

  return html;
}

const createSliderBox = (title, minPrice, maxPrice, init) => {
  const html = `
    <span class="settingTitle" id="sliderValue" style="margin-bottom:5px">${title}${init}$</span>
    <div class="sliderContainer">
      <input type="range" min="${minPrice}" max="${maxPrice}" value="${init}" class="slider" id="priceSlider">
    </div>`

  $(document).on('input', '#priceSlider', () => {
    $('#sliderValue').html(title + $('#priceSlider').val() + '$');
  })

  $(document).on('mouseenter ', '#priceSlider', () => {
    $('#sliderValue').css({ 'color': 'white' });
  })

  $(document).on('mouseleave ', '#priceSlider', () => {
    $('#sliderValue').css({ 'color': '' });
  })

  $(document).on('mouseup', '#priceSlider', () => {
    drawMatchedOffer(0);
  })

  return html;
}

const displaySingleMessageInfo = (info) => {
  $('.roomsOffers').ready(() => {
    if ($('.roomsOffers').find('.offerItem').text() === info) {
      return;
    }

    const html = `<div class="offerItem" style="font-size:16px">${info}<div>`;

    $('.roomsOffers').empty();
    $('#rightRoomArrow').hide();
    $('#leftRoomArrow').hide();

    $('.roomsOffers').append(html)
      .hide().show('slow');
  })
}

const createDateBox = (text) => {
  const html = `
  <i class="far fa-calendar-plus calendarIcon"></i>
  <label class="dateInput"></label>`;

  $('#dateInput').ready(() => {
    $('.dateInput').text(text);

    $('.calendarIcon').daterangepicker({
      "autoApply": true,
    }, (start, end, label) => {
      $('.dateInput').text(start.format('DD.MM.YYYY') + " - " + end.format('DD.MM.YYYY'));

      if (!(start.isAfter(moment()) || start.isSame(moment(), "day")) ||
        !end.isAfter(moment()) || !end.isAfter(start)) {
        displaySingleMessageInfo('Selected date from the past<br><br>Please set proper date');

        $('.dateInput').text(text);
      }
      else if (moment.duration(end.diff(start)).asYears() > 1) {
        displaySingleMessageInfo(`Duration of your visit can't be longer than one year<br><br>Please set proper date`);

        $('.dateInput').text(text);
      }
      else {
        drawMatchedOffer(0);
      }
    })
  })

  return html;
}

const drawTickOrCross = (status) => {
  if (status) {
    return `<i class="fas fa-check"></i>`;
  }

  return `<i class="fas fa-times"></i>`;
}

const isDateSet = () => {
  return $('.dateInput').text().includes('-');
}

const createMainOffersInfo = (which, matchedOffers) => {
  const html = `
      <div class="mainOffersInfo">
          <div class="offerItem">Type of room: ${matchedOffers[ which ].name}</div>
          <div class="offerItem">Max number of guests: ${matchedOffers[ which ].guests}</div>
          <div class="offerItem">Beds: ${matchedOffers[ which ].beds}</div>
          <div class="offerItem">Price: ${matchedOffers[ which ].price}$</div>
        </div>`;

  return html;
}

const createAdditionalOffersInfo = (which, matchedOffers) => {
  const html = `
      <div class="additionalOffersInfo">
          <div class="offerItem">Children ${drawTickOrCross(matchedOffers[ which ].children)}</div>
          <div class="offerItem">Pets ${drawTickOrCross(matchedOffers[ which ].pets)}</div>
          <div class="offerItem">Balcony ${drawTickOrCross(matchedOffers[ which ].balcony)}</div>
          <div class="offerItem">Jacuzzi ${drawTickOrCross(matchedOffers[ which ].jacuzzi)}</div>
          <div class="offerItem">Pool ${drawTickOrCross(matchedOffers[ which ].pool)}</div>
        </div>`;

  return html;
}

const createOfferButton = () => {
  const html = `<button type="button" class="offerButton">Want it !</button>`;

  $('.offerButton').ready(() => {
    $('.offerButton').click(() => {
      if (!Cookies.get('hotel')) {
        Cookies.set('hotel', JSON.stringify(offers.getMatched()[offers.current()]));
        InfoBox.create('Choosen hotel room has been successfully added to your basket');
      }
      else {
        InfoBox.create('Your basket already contains hotel room');
      }
    })
  })

  return html;
}

const createOfferCounter = (which, matchedOffers) => {
  const html = `<div class="offerItem">${which + 1} / ${matchedOffers.length}</div>`;

  return html;
}

const drawMatchedOffer = (which) => {
  if (!isDateSet()) {
    displaySingleMessageInfo('Specify duration of your stay at our hotel');

    return;
  }

  offers.setLocal();

  roomService.getRooms().then(data => {
    offers.setRemote(data);

    let matchedOffers = offers.compareSettings();

    $('.roomsOffers').empty();

    if (matchedOffers.length > 0) {
      $('.roomsOffers').ready(() => {
        $('#rightRoomArrow').show();
        $('#leftRoomArrow').show();

        $('.roomsOffers').hide().append(createMainOffersInfo(which, matchedOffers))
          .append(createAdditionalOffersInfo(which, matchedOffers))
          .append(createOfferButton())
          .append(createOfferCounter(which, matchedOffers))
          .slideDown('800');
      })
    }
    else {
      displaySingleMessageInfo('No offers found');
    }
  })
}

const createRoomOffer = () => {
  const html = `
  <div class="leftArrow roomArrow" id="leftRoomArrow"></div>
  <div class="roomsOffers"></div>
  <div class="rightArrow roomArrow" id="rightRoomArrow"></div>`

  drawMatchedOffer(0);

  $(document).on('click', '#leftRoomArrow', () => {
    if (offers.getMatched().length > 1) {
      drawMatchedOffer(offers.back());
    }
  })

  $(document).on('click', '#rightRoomArrow', () => {
    if (offers.getMatched().length > 1) {
      drawMatchedOffer(offers.next());
    }
  })

  return html;
}

export const hotel = () => {
  const fragment = $(new DocumentFragment());

  const html = `
  <div class="backgroundRooms"></div>
      <div class="hotelContainer">
        <div class="mainPanel">
          <div class="settingsPanel">
            <div class="guestsBox">
              ${createQuantityBox('Guests')}
            </div>
            <div class="priceBox">
              ${createSliderBox('Max price: ', 1, 7000, 3500)}
            </div>
            <div class="dateBox">
            ${createDateBox('Set date of visit')}
            </div>
            <div class="optionsBox">
              ${createCheckBoxSetting('Children')}
              ${createCheckBoxSetting('Pets')}
              ${createCheckBoxSetting('Balcony')}
              ${createCheckBoxSetting('Mini-bar')}
              ${createCheckBoxSetting('Jacuzzi')}
              ${createCheckBoxSetting('Pool')}
            </div>  
          </div>
          <div class="roomPanel">
            ${createRoomOffer()}
          </div>
        </div>
      </div>`;

  fragment.append(html);

  return fragment;
};