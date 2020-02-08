import { home, hotel, treatments, booking} from '../views';

export const routes = [
    {path: '/', data: {}, component: home},
    {path: '/home', data: {}, component: home},
    {path: '/hotel', data: {}, component: hotel},
    {path: '/treatments', data: {}, component: treatments},
    {path: '/booking', data: {}, component: booking}
];
