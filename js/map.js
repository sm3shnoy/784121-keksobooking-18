'use strict';

(function () {
  // Взаимодействие с меткой на карте
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  // Высота острого конца маркера
  var heightPoint = 22;

  // Размеры маркера
  var pinSize = {
    width: 65,
    height: 65 + heightPoint
  };

  window.form.elementsDisabled(window.form.formElement);
  window.form.elementsDisabled(mapFilters);

  var windowLimit = {
    x: {
      min: window.data.location.x.min,
      max: window.data.location.x.max
    },
    y: {
      min: window.data.location.y.min,
      max: window.data.location.y.max
    }
  };

  // Делаем активными элементы на странице при взаимодействии с пином на карте
  var pinEnable = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.elementsEnabled(window.form.formElement);
    window.form.elementsEnabled(mapFilters);

    // Добавляем все возможные пины на карту
    window.pin.similarListElement.appendChild(pinFragment);

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

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinMoveLimit = {
        top: windowLimit.y.min - mainPin.offsetHeight,
        bottom: windowLimit.y.max - mainPin.offsetHeight,
        left: windowLimit.x.min - mainPin.offsetWidth,
        right: windowLimit.x.max - mainPin.offsetWidth
      };

      var pinPosition = {
        x: mainPin.offsetLeft - shift.x - pinSize.width / 2,
        y: mainPin.offsetTop - shift.y - pinSize.height / 2
      };

      if (pinPosition.x >= pinMoveLimit.left && pinPosition.x <= pinMoveLimit.right) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (pinPosition.y >= pinMoveLimit.top && pinPosition.y <= pinMoveLimit.bottom) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

    };

    var mainPinMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      addressField.value = mainPin.style.left + ' ' + mainPin.style.top;

      document.removeEventListener('mousemove', mainPinMousemoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHandler);
    };

    document.addEventListener('mousemove', mainPinMousemoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHandler);
  });

})();
