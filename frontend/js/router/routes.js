import { home, hotel, services, booking} from '../views';

export const routes = [
    {path: '/', data: {}, component: home},
    {path: '/home', data: {}, component: home},
    {path: '/hotel', data: {}, component: hotel},
    {path: '/services', data: {}, component: services},
    {path: '/booking', data: {}, component: booking}
];
