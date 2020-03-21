import {home} from '../components/HomeComponent/home';
import {hotel} from '../components/HotelComponent/hotel';
import {services} from '../components/ServicesComponent/services';
import {basket} from '../components/BasketComponent/basket';

export const routes = [
    {path: '/', data: {}, component: home},
    {path: '/home', data: {}, component: home},
    {path: '/hotel', data: {}, component: hotel},
    {path: '/services', data: {}, component: services},
    {path: '/basket', data: {}, component: basket}
];
