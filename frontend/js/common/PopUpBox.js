class InfoBox {
  static create(info) {
    if ($('.popUpBox').length) {
      $('.popUpBox').remove();
    }

    const html = `
      <div class="popUpBox">
        <i class="fas fa-times cross"></i>
        ${info}
      </div>`;

    $('.mainPanel').ready(() => {
      $('.cross').ready(() => {
        $('.cross').click(() => {
          $('.popUpBox').remove();
        })
      })

      $('.mainPanel').append(html);

      $('.popUpBox').ready(() => {
        $('.popUpBox').hover(() => {
          $('.popUpBox').stop(true);
          $('.popUpBox').css({ 'opacity': '1.0' })
        });
        $('.popUpBox').fadeTo(10000, 0.0, () => { $('.popUpBox').remove(); });
      })
    })
  }
}

class YesNoBox {
  static create(info, yesCallback) {
    if ($('.popUpBox').length) {
      $('.popUpBox').remove();
    }

    const html = `
      <div class="popUpBox">
        <i class="fas fa-times cross"></i>
        ${info}
        <div class="yesNoContainer">
          <button type="button" class="yesNoButton" id="yesButton">Yes</button>
          <button type="button" class="yesNoButton" id="noButton">No</button>
        </div>
      </div>`;

    $('.mainPanel').ready(() => {
      $('.cross').ready(() => {
        $('.cross').click(() => {
          $('.popUpBox').remove();
        })
      })

      $('#noButton').ready(() => {
        $('#noButton').click(() => {
          $('.popUpBox').remove();
        })
      })

      $('#yesButton').ready(() => {
        $('#yesButton').click(() => {
          yesCallback();
          $('.popUpBox').remove();
        })
      })

      $('.mainPanel').append(html);
    })
  }
}

export {
  InfoBox,
  YesNoBox
}