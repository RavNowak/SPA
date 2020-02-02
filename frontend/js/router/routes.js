import { home, rooms, treatments, booking} from '../views';

export const routes = [
    {path: '/', data: {}, component: home},
    {path: '/home', data: {}, component: home},
    {path: '/rooms', data: {}, component: rooms},
    {path: '/treatments', data: {}, component: treatments},
    {path: '/booking', data: {}, component: booking}
];
