'use strict';

(function () {
  // Пины на странице
  var similarListElement = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  // Генерируем пины
  var createPins = function (arr) {
    var adsElement = similarPinTemplate.cloneNode(true);

    adsElement.style.left = arr.location.x + 'px';
    adsElement.style.top = arr.location.y + 'px';
    adsElement.querySelector('img').src = arr.author.avatar;
    adsElement.querySelector('img').alt = arr.offer.title;

    // При клике на pin показываем карточку
    var openCardClickHandler = function () {
      var card = document.querySelector('.map__card');

      if (card) {
        card.remove();
      }

      window.card.similarCardListElement.insertAdjacentElement('afterbegin', window.card.renderedCard(arr));
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
    var mainPinDefaultPos = {
      left: '570px',
      top: '375px'
    };
    var pins = document.querySelectorAll('.map__pin');
    var mapPins = document.querySelector('.map__pins');
    var mainPin = document.querySelector('.map__pin--main');
    var mapFilters = document.querySelector('.map__filters');
    var adPrice = document.querySelector('#price');

    adPrice.placeholder = 1000;
    mapFilters.reset();
    mainPin.style.left = mainPinDefaultPos.left;
    mainPin.style.top = mainPinDefaultPos.top;
    window.form.elementsDisabled(window.form.formElement);
    window.form.elementsDisabled(window.map.mapFilters);
    window.form.form.classList.add('ad-form--disabled');
    window.form.form.reset();
    window.map.map.classList.add('map--faded');
    window.loadImage.deactivate();
    window.loadImage.remove();

    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        mapPins.removeChild(pins[i]);
      }
    }

    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }

    window.map.showPin();
    window.form.checkCountRoom(window.form.roomCount.value);

    var cleanFormBtn = document.querySelector('.ad-form__reset');
    cleanFormBtn.removeEventListener('click', window.pin.cleanPins);
  };

  window.pin = {
    similarListElement: similarListElement,
    createPins: createPins,
    cleanPins: cleanPins
  };

})();
