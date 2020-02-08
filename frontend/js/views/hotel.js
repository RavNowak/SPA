import $ from 'jquery';
import '../../style/hotel.scss';

export const hotel = () => {
    const fragment = $(new DocumentFragment());
  
    fragment.append(`
    <div class="hotelRooms">
        <div class="hotelShadow">
        <div>
    </div>
    `);
  
    
  
    return fragment;
  };