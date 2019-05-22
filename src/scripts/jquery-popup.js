import $ from 'jquery';
import compareTime from './compareTime';

export default function pnPopup() {
  $(document).ready(() => {
    const floatobject = JSON.parse(localStorage.getItem('floater'));
    const dateString = floatobject ? floatobject.timestamp : 0;
    const now = new Date().getTime().toString();
    const viewportWidth = parseInt($(window).width());

    if (compareTime(now, dateString) && viewportWidth > 640) {
      $('.floater').addClass('floating-box');
      localStorage.removeItem('floater');
    } else {
      $('.floater').removeClass('floater');
    }
    const viewportHeight = parseInt($(window).height());

    $(window).scroll(() => {
      const offsetFooter = $('.promo').offset()
        ? $('.promo').offset().top + $('.floater').height()
        : 0;
      const scroll = parseInt($(window).scrollTop());
      const scrollRelBottom = scroll + viewportHeight;
      if (scrollRelBottom > offsetFooter) {
        if ($('.floater').hasClass('floating-box')) {
          $('.floater')
            .removeClass('floating-box')
            .addClass('f-closed');
        }
      } else {
        $('.floater').addClass('floating-box');
      }
    });

    setTimeout(() => {
      $('.floating-box').removeClass('f-closed');
    }, 1000);

    $('.floating-box__close').click(() => {
      const object = { visible: 'false', timestamp: new Date().getTime() };
      localStorage.setItem('floater', JSON.stringify(object));
      $('.floater').removeClass('floating-box');
      $('.floater').removeClass('floater');
    });
  });
}
