'use strict';

(function () {
  // Взаимодействие с меткой на карте
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  window.form.elementsDisabled(window.form.formElement);
  window.form.elementsDisabled(mapFilters);

  // Делаем активными элементы на странице при взаимодействии с пином на карте
  var pinEnable = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.elementsEnabled(window.form.formElement);
    window.form.elementsEnabled(mapFilters);

    // Добавляем все возможные пины на карту
    window.pin.similarListElement.appendChild(pinFragment);

    addressField.value = mainPin.style.left + ' ' + mainPin.style.top;
    addressField.setAttribute('readonly', true);
  };

  mainPin.addEventListener('mousedown', function () {
    pinEnable();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      pinEnable();
    }
  });

  // Создаем фрагмент для вставки на страницу
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < window.data.allData.length; i++) {
    pinFragment.appendChild(window.pin.renderedPins(window.data.allData[i]));
  }

})();
