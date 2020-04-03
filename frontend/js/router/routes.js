import {home} from '../components/HomeComponent/home';
import {hotel} from '../components/HotelComponent/hotel';
import {services} from '../components/ServicesComponent/services';
import {basket} from '../components/BasketComponent/basket';
import {contact} from '../components/ContactComponent/contact';

export const routes = [
    {path: '/', data: {}, component: home},
    {path: '/home', data: {}, component: home},
    {path: '/hotel', data: {}, component: hotel},
    {path: '/services', data: {}, component: services},
    {path: '/contact', data: {}, component: contact},
    {path: '/basket', data: {}, component: basket}
];
