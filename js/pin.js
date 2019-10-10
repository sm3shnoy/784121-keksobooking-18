'use strict';

(function () {
  // Пины на странице
  var similarListElement = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  window.pin = {
    similarListElement: similarListElement,

    // Генерируем пины
    renderedPins: function (arr) {
      var adsElement = similarPinTemplate.cloneNode(true);

      adsElement.style.left = arr.location.x + 'px';
      adsElement.style.top = arr.location.y + 'px';
      adsElement.querySelector('img').src = arr.author.avatar;
      adsElement.querySelector('img').alt = arr.offer.title;

      // При клике на pin показываем карточку
      var openCardClickHandler = function (evt) {
        if (evt.target) {
          window.card.similarCardListElement.insertAdjacentElement('afterbegin', window.card.renderedCard(arr));
        }
      };

      adsElement.addEventListener('click', function (evt) {
        openCardClickHandler(evt);
      });

      adsElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ENTER_KEYCODE) {
          openCardClickHandler(evt);
        }
      });

      return adsElement;
    }
  };

})();
