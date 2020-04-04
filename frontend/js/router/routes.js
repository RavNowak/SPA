import {home} from '../components/HomeComponent/home';
import {hotel} from '../components/HotelComponent/hotel';
import {services} from '../components/ServicesComponent/services';
import {basket} from '../components/BasketComponent/basket';
import {contact} from '../components/ContactComponent/contact';

export const routes = [
    {path: '/SPA/', data: {}, component: home},
    {path: '/SPA/home/', data: {}, component: home},
    {path: '/SPA/hotel/', data: {}, component: hotel},
    {path: '/SPA/services/', data: {}, component: services},
    {path: '/SPA/contact/', data: {}, component: contact},
    {path: '/SPA/basket/', data: {}, component: basket}
];
