import { contactService } from '../../services/contactService';
import './contact.scss';

const createQuestionText = () => {
  const html = `
  <div class="questionSection">
    <span class="contactText">Have any quastions ? Contact our staff.</span>
  </div>`;

  return html;
}

const createPictureContact = (data) => {
  const html = `
  <div class="nameSection">
    <img src="${data.picture.medium}" alt="stuff picture">
    <span class="name">${data.name.title} ${data.name.first} ${data.name.last}</span>
  </div>`

  return html;
}

const createPhonesContact = (data) => {
  const html = `
  <div class="telSection">
    <i class="fas fa-phone-alt fa-lg"></i>
    <span class="name">${data.phone}</span>
  </div>
  <div class="telSection">
    <i class="fas fa-mobile-alt fa-lg"></i>
    <span class="name">${data.cell}</span>
  </div>`;

  return html;
}

const createEmailContact = (data) => {
  const html = `
  <div class="emailSection">
    <i class="far fa-envelope fa-lg"></i>
    <span class="name">${data.email}</span>
  </div>`

  return html;
}

const createContact = () => {
  const html = `<div class="contact"></div>`;

  contactService.getRooms().then(data => {
    $('.contact').ready(() => {
      $('.contact').append(createQuestionText())
                   .append(createPictureContact(data.results[0]))
                   .append(createPhonesContact(data.results[0]))
                   .append(createEmailContact(data.results[0]))
    })
  })

  return html;
}

export const contact = () => {
  const fragment = $(new DocumentFragment());

  const html = `
  <div class="backgroundContact"></div>
  <div class="contactContainer">
      <div class="contactPanel">
        ${createContact()}
      </div>
  </div>`;

  fragment.append(html);

  return fragment;
};