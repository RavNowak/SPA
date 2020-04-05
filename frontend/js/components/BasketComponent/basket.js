import { InfoBox, YesNoBox } from '../../common/PopUpBox';
import { FormValidator } from '../../common/FormValidator';
import { authService } from '../../services/authService';
import { accountService } from '../../services/accountService';
import { Error } from '../../common/Errors';
import './basket.scss';

const createHotelItem = () => {
  let hotelObject = null;

  if (Cookies.get('hotel')) {
    hotelObject = JSON.parse(Cookies.get('hotel'));
  }
  else {
    return '';
  }

  const html = `
  <div class="singleInfo" id="hotelInfo">
    <i class="fas fa-times cross" id="hotelCross"></i>
    <span class="singleItem titleItem">Information about hotel</span>
    <span class="singleItem">Type of room: ${hotelObject.name}</span>
    <span class="singleItem">Beds: ${hotelObject.beds}</span>
    <span class="singleItem">Guests: ${hotelObject.guests}</span>
    <div class="hotelAdditionalInfo">
      <span class="singleItem">Children: ${drawTickOrCross(hotelObject.children)}</span>
      <span class="singleItem">Pets: ${drawTickOrCross(hotelObject.pets)}</span>
      <span class="singleItem">Balcony: ${drawTickOrCross(hotelObject.balcony)}</span>
      <span class="singleItem">Mini-Bar: ${drawTickOrCross(hotelObject.miniBar)}</span>
      <span class="singleItem">Jacuzzi: ${drawTickOrCross(hotelObject.jacuzzi)}</span>
      <span class="singleItem">Pool: ${drawTickOrCross(hotelObject.pool)}</span>
    </div>
    <span class="singleItem priceItem">Price: ${hotelObject.price}$</span>
  </div>`;

  $('#hotelInfo').ready(() => {
    handleCrossClick($('#hotelCross'), $('#hotelInfo'), 'hotel');
  })

  return html;
}

const handleCrossClick = (cross, item, cookieName, serviceName) => {
  const clear = () => {
    item.remove();
    Cookies.remove(cookieName);

    if (isBasketEmpty()) {
      $('.basket').remove();
      $('.mainPanel').append(createEmptyBasket());
    }
  }

  cross.ready(() => {
    cross.click(() => {
      if (cookieName === 'hotel') {
        YesNoBox.create('Remove hotel room from your basket ?', clear);
      }
      else {
        YesNoBox.create(`Remove "${serviceName}" from your basket ?`, clear);
      }
    })
  })
}

const drawTickOrCross = (status) => {
  if (status) {
    return `<i class="fas fa-check"></i>`;
  }

  return `<i class="fas fa-times"></i>`;
}

const createEmptyBasket = () => {
  const html = `
  <div class="emptyBasket">
    <span style="margin:5px">Your basket is empty</span>
    <span style="margin:5px">and</span>
    <span style="margin:5px">probably very sad ...</span>
  </div>`

  return html;
}

const createAuthInputs = () => {
  const html = `
  <input type="text" placeholder="E-mail" class="inputText" id="login">
  <input type="password" placeholder="Password" class="inputText" id="password"></input>
  <span class="formError" id="loginError"></span>`;

  return html;
}

const createLoginButton = () => {
  const html = `<button type="button" class="basketButton" id="loginButton" style="width:70%">Log In</button>`;

  $('#loginButton').ready(() => {
    $('#loginButton').click(() => {
      if ($('#loginButton').text() === 'Log In') {
        $('#loginButton').before(createAuthInputs());
        $('#loginButton').text('Submit');
      }
      else {
        if (!FormValidator.isFullFilled($('.endSection input[type=text],input[type=password]'))) {
          $('#loginError').text('Both fields must be filled');
        }
        else {
          authService.auth($('#login').val(), $('#password').val()).then(response => {
            if (response.OK) {
              $('.endSection').remove();
              $('.basket').append(createConfirmationButton());
              Cookies.set('isloggedin', 'true');
              location.reload();
            }
            else {
              $('#loginError').text(response.message);
            }
          })
        }
      }
    })
  })

  return html;
}

const createSignUpTextItem = (type, placeholder, id, config, error) => {
  const html = `
  <input type="${type}" placeholder="${placeholder}" class="inputText" id="${id}" style="width:90%;padding:10px"></input>
  <span class="formError" id="${id}Error"></span>`;

  $(`#${id}`).ready(() => {
    $(`#${id}`).focusout(() => {
      if (!FormValidator.isProper($(`#${id}`).val(), config.regex)) {
        $(`#${id}Error`).text(error);
      }
      else {
        $(`#${id}Error`).text('');
      }
    })

    $(`#${id}`).on('change keydown paste input', () => {
      $('#formError').html('')
    })
  })

  return html;
}

const createEyeHint = () => {
  const html = `<i class="fas fa-eye passHint"></i>`;

  $('.passHint').ready(() => {
    $('.passHint').hover(() => {
      $('#password').attr('type', 'text');
    })
    $('.passHint').mouseleave(() => {
      $('#password').attr('type', 'password');
    })
  })

  return html;
}

const createSignUpPasswordItem = (type, placeholder, id, config, error) => {
  const html = `
  <div class="passBox">
    <input type="password" placeholder="Password" class="inputText" id="password" style="width:100%;padding:10px;margin:10px 0"></input>
    ${createEyeHint()}
  </div>
  <meter max="4" id="password-strength-meter"></meter>
  <p id="password-strength-text" style="color:white;"></p>`;

  $("#password").ready(() => {
    $("#password").on('change keydown paste input', () => {
      $('#formError').html('');

      const result = zxcvbn($("#password").val());
      const strength = {
        0: "Worst",
        1: "Bad",
        2: "Weak",
        3: "Good",
        4: "Strong"
      }

      $('#password-strength-meter').val(result.score);

      if ($("#password").val() !== "") {
        $('#password-strength-text').html("Strength: " + strength[result.score]); 
      } else {
        $('#password-strength-text').html(''); 
      }
    })
  })

  return html;
}

const createCancelButton = () => {
  const html = `<button type="button" class="basketButton" id="cancelButton" style="width:80%">Back to basket</button>`;

  $('#cancelButton').ready(() => {
    $('#cancelButton').click(() => {
      $('.basket').empty()
                  .append(createHotelItem())
                  .append(createServicesContent())
                  .append(createBasketSummary());

    })
  })

  return html;
}

const clearForm = () => {
  $('#name').val('');
  $('#surname').val('');
  $('#email').val('');
  $('#tel').val('');
  $('#password').val('');
  $('#formError').html('');
  $('#password-strength-meter').val(0);
  $('#password-strength-text').html(''); 
}

const createSignUpButton = () => {
  const html = `<button type="button" class="basketButton" id="signupButton" style="width:80%">Submit</button>`;

  $('#signupButton').ready(() => {
    $('#signupButton').click(() => {
      if (FormValidator.isFullFilled($('.basket input[type=text],input[type=password]')) && 
            FormValidator.getFormStatus())
      {
      accountService.create($('#name').val(), $('#surname').val(), $('#email').val(), $('#tel').val(), $('#password').val()).
        then((response) => {
          if (response.OK) {
            InfoBox.create('User account created succesfully');
            clearForm();
          }
          else {
            $('#formError').html(response.message);
          }
        })
      }
      else {
        $('#formError').html('All fields must be filled correctly');
      }
    })
  })

  return html;
}

const createSignUpFormButtons = () => {
  const html = `
  <div class="signUpButtons">
    ${createSignUpButton()}
    ${createCancelButton()}
  </div>`;

  return html;
}

const createNewAccountButton = () => {
  const html = `<button type="button" class="basketButton" id="signupButton" style="width:70%">Create It</button>`;

  $('#signupButton').ready(() => {
    $('#signupButton').click(() => {
      $('.basket').empty();

      const header = `
      <h1 style="color:white;padding:10px;">Sign Up</h1>
      <p style="color:white;padding:10px;text-align:center">Please fill in this form to create your free account.</p>`;

      $('.basket').append(header)
        .append(createSignUpTextItem('text', 'Name', 'name', { regex: /^[A-Za-z]+$/ }, Error.name))
        .append(createSignUpTextItem('text', 'Surname', 'surname', { regex: /^[A-Za-z]+$/ }, Error.surname))
        .append(createSignUpTextItem('text', 'Email', 'email', { regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }, Error.email))
        .append(createSignUpTextItem('text', 'Telephone', 'tel', { regex: /^\d{9}$/ }, Error.tel))
        .append(createSignUpPasswordItem())
        .append(`<span class="formError" id="formError" style="margin-bottom:5px"></span>`)
        .append(createSignUpFormButtons());
    })
  })

  return html;
}

const createLoginSection = () => {
  const html = `
  <div class="endSection">
    <span class="singleItem" style="color:white">Please log in to confirm the reservation</span>
    ${createLoginButton()}
    <span class="singleItem" style="color:white">Haven't account at our hotel ?</span>
    ${createNewAccountButton()}
  </div>`;

  return html;
}

const removeBasketCookies = () => {
  const numOfBasketCookies = 8;

  for (let i = 1; i < numOfBasketCookies; i++) {
    Cookies.remove('service_' + i);
  }

  Cookies.remove('hotel');
}

const createConfirmationButton = () => {
  const html = `
  <div class="endSection">
    <button type="button" id="confirmationButton" class="basketButton" style="width:100%">Confirm</button>
  <div>`;

  $('#confirmationButton').ready(() => {
    $('#confirmationButton').click(() => {
      $('.basket').slideUp('slow', () => {
        $('.mainPanel').append(createEmptyBasket());

        InfoBox.create('The order has been placed successfully');

        removeBasketCookies();
      })
    })
  })

  return html;
}

const createBasketSummary = () => {
  if (!Cookies.get('isloggedin') || Cookies.get('isloggedin') == 'false') {
    return createLoginSection();
  }

  return createConfirmationButton();
}

const isBasketEmpty = () => {
  let empty = true;

  if (Cookies.get('hotel')) {
    return false;
  }

  for (let i = 1; i < 8; i++) {
    if (Cookies.get('service_' + i)) {
      return false;
    }
  }

  return empty;
}

const createBasketContent = () => {
  let html = ``;

  if (isBasketEmpty()) {
    html = createEmptyBasket();
  }
  else {
    html = `
    <div class="basket">
      ${createHotelItem()}
      ${createServicesContent()}
      ${createBasketSummary()}
    </div>`;
  }

  return html;
}

const createServicesContent = () => {
  let services = [];

  for (let i = 1; i < 8; i++) {
    if (Cookies.get('service_' + i)) {
      services.push(JSON.parse(Cookies.get('service_' + i)))
    }
  }

  let html = ``;

  if (services.length > 0) {
    for (const service of services) {
      html += `
      <div class="singleInfo" id="service_${service.id}">
        <i class="fas fa-times cross" id="cross_${service.id}"></i>
        <span class="singleItem titleItem">Information about service</span>
        <span class="singleItem">Name: ${service.name}</span>
        <span class="singleItem">Area: ${service.area}</span>
        <span class="singleItem">Time: ${service.time}min</span>
        <span class="singleItem priceItem">Price: ${service.price}$</span>
      </div>`

      const serviceName = 'service_' + service.id;
      const crossName = 'cross_' + service.id;

      $(`#${serviceName}`).ready(() => {
        handleCrossClick($(`#${crossName}`), $(`#${serviceName}`), serviceName, service.name);
      });
    }
  }

  return html;
}

export const basket = () => {
  const fragment = $(new DocumentFragment());

  const html = `
    <div class="backgroundBasket"></div>
    <div class="basketContainer">
      <div class="mainPanel">
        ${createBasketContent()}
      </div>
    </div>`

  fragment.append(html);

  return fragment;
};
