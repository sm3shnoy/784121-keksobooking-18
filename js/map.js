'use strict';

(function () {
  var main = document.querySelector('main');
  // Взаимодействие с меткой на карте
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

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

    // Добавляем метки на карту
    var successHandler = (function (ads) {
      var mapPins = document.querySelector('.map__pins');

      for (var i = 0; i < window.data.allData.length; i++) {
        mapPins.appendChild(window.pin.renderedPins(ads[i]));
      }
    });

    var errorHandler = function () {
      var templateError = document.querySelector('#error').content.querySelector('.error');
      var errorElement = templateError.cloneNode(true);

      main.appendChild(errorElement);
    };

    window.backend.load(successHandler, errorHandler);

    addressField.setAttribute('readonly', true);

    mainPin.removeEventListener('keydown', pinEnableEnterPressHandler);
    mainPin.removeEventListener('click', pinEnableClickdownHandler);
  };

  var pinEnableEnterPressHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      pinEnable();
    }
  };

  var pinEnableClickdownHandler = function () {
    pinEnable();
  };

  var showPin = function () {
    mainPin.addEventListener('keydown', pinEnableEnterPressHandler);
    mainPin.addEventListener('click', pinEnableClickdownHandler);
  };

  showPin();


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

      var pinSize = {
        width: 65,
        height: 65 + 22
      };

      var pinMoveLimit = {
        top: windowLimit.y.min - mainPin.offsetHeight,
        bottom: windowLimit.y.max - mainPin.offsetHeight,
        left: windowLimit.x.min - mainPin.offsetWidth,
        right: windowLimit.x.max - mainPin.offsetWidth
      };

      var pinPosition = {
        x: mainPin.offsetLeft - shift.x - pinSize.width / 2,
        y: mainPin.offsetTop - shift.y + pinSize.height / 2
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
