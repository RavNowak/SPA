import $ from 'jquery';
import '../../style/hotel.scss';

const createQuantityBox = (title) => {
  const html = `
    <div class="quantityBox">
      <span class="settingTitle">${title}</span>
      <input type="number" min="1" max="9" step="1" value="1">
        <div class="quantity-nav">
          <div class="quantity-button quantity-up">+</div>
          <div class="quantity-button quantity-down">-</div>
        </div>
    </div>`;

    $('.quantityBox').ready(() => {
      const spinner = $('.quantityBox'),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
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
      });

      btnDown.click(() => {
        const oldValue = parseFloat(input.val());
        let newValue = oldValue;

        if (oldValue > min) {
          newValue = oldValue - 1;
        } 

        spinner.find("input").val(newValue);
        spinner.find("input").trigger("change");
      });
    });

    return html;
}

const createCheckBoxSetting = (title) => {
  const html = `
    <div class="checkBoxSetting">
      <span class="settingTitle" id="${title}Title">${title}</span>
      <div class="coolCheckBox">  
        <input type="checkbox" value="None" id="${title}" name="${title}" unchecked>
        <label for="${title}"></label>
      </div>
    </div>`;

    $(document).on('change', `#${title}`, () => {
      if ($(`#${title}`).is(':checked')) {
        $(`#${title}Title`).css({'color':'white'});
      }
      else {
        $(`#${title}Title`).css({'color':'rgba(255, 255, 255, 0.589)'});
      }
    });

  return html;
}

export const hotel = () => {
    const fragment = $(new DocumentFragment());

    fragment.append(`
      <div class="backgroundRooms"></div>
      <div class="mainPanel">
        <div class="settingsPanel">
          ${createQuantityBox('Guests')}
          ${createCheckBoxSetting('Children')}
          ${createCheckBoxSetting('Pets')}
          ${createCheckBoxSetting('Balcony')}
          ${createCheckBoxSetting('Mini-bar')}
          ${createCheckBoxSetting('Jacuzzi')}
          ${createCheckBoxSetting('Pool')}
        </div>
      </div>
    `);

    return fragment;
  };