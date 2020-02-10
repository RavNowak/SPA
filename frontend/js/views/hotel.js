import $ from 'jquery';
import '../../style/hotel.scss';

const createQuantityBox = (title) => {
  const html = `
    <div class="quantityBox">
      <span class="settingTitle">${title}</span>
      <input type="number" min="1" max="9" step="1" value="1">
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
    <div class="checkBoxSetting" id="checkBoxSetting${title}">
      <span class="settingTitle" id="${title}Title">${title}</span>
      <div class="coolCheckBox">  
        <input type="checkbox" value="None" id="${title}" name="${title}" unchecked>
        <label for="${title}"></label>
      </div>
    </div>`;

    $(document).on('change', `#${title}`, () => {
      if ($(`#${title}`).is(':checked')) {
        $(`#${title}Title`).css({'color':'white'});
        $(`#checkBoxSetting${title}`).css({'background-color':'rgba(30, 137, 199, 0.212)'});
      }
      else {
        $(`#${title}Title`).css({'color':'rgba(255, 255, 255, 0.589)'});
        $(`#checkBoxSetting${title}`).css({'background-color':''});
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
          <div class="guestsBox">
            ${createQuantityBox('Guests')}
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
      </div>
    `);

    return fragment;
  };