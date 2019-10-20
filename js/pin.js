'use strict';

(function () {
  // Пины на странице
  var similarListElement = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  // Генерируем пины
  var renderedPins = function (arr) {
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
  };

  // Удаляем пины при успешной отправке формы
  var cleanPins = function () {
    var pins = document.querySelectorAll('.map__pin');
    var mapPins = document.querySelector('.map__pins');

    window.form.elementsDisabled(window.form.formElement);
    window.form.elementsDisabled(window.map.mapFilters);
    window.form.form.classList.add('ad-form--disabled');
    window.form.form.reset();
    window.map.map.classList.add('map--faded');

    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        mapPins.removeChild(pins[i]);
      }
    }

    window.map.showPin();
  };

  window.pin = {
    similarListElement: similarListElement,
    renderedPins: renderedPins,
    cleanPins: cleanPins
  };

})();
