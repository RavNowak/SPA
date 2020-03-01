import { Cookie } from '../common/Cookie';

export const services = () => {
    const fragment = $(new DocumentFragment());

    Cookie.setCookie('rafi', 'jest super');
    console.log(Cookie.getCookie('rafi'));

    fragment
        .append('<h2>Services</h2>')
        .append('<p>Lorem ipsum </p>');

    return fragment;
};
