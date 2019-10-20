'use strict';

(function () {
  // Делаем группы полей неактивными
  var formElement = document.querySelector('.ad-form--disabled');

  // Валидация формы
  var adPrice = document.querySelector('#price');
  var typePlace = document.querySelector('#type');

  adPrice.placeholder = 1000;

  // Проверка валидности типа жилья
  typePlace.addEventListener('change', function () {
    var price = 0;

    if (typePlace.value === 'bungalo') {
      price = 0;
    } else if (typePlace.value === 'flat') {
      price = 1000;
    } else if (typePlace.value === 'house') {
      price = 5000;
    } else {
      price = 10000;
    }

    adPrice.placeholder = price;
    adPrice.min = price;
  });

  // Проверка валидности комната - гость
  var roomCount = document.querySelector('#room_number');
  var guestsCount = document.querySelector('#capacity');
  var guestSelectOption = guestsCount.querySelectorAll('option');

  // Создаем объект количество комнат = определенное количество гостей
  var roomsCount = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var checkCountRoom = function (value) {
    // Блокируем выбор количества гостей
    guestSelectOption.forEach(function (option) {
      option.disabled = true;
    });

    // Разблокируем количество гостей в соответствии с выбранным количеством комнат
    roomsCount[value].forEach(function (userChoice) {
      guestSelectOption.forEach(function (roomsCountUserChoice) {
        if (Number(roomsCountUserChoice.value) === userChoice) {
          roomsCountUserChoice.disabled = false;
          roomsCountUserChoice.selected = true;
        }
      });
    });
  };

  roomCount.addEventListener('change', function (evt) {
    checkCountRoom(evt.target.value);
  });

  checkCountRoom(roomCount.value);

  // Синхронизируем время заезда - время выезда
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeInOption = timeIn.querySelectorAll('option');
  var timeOutOption = timeOut.querySelectorAll('option');

  var timeCheck = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].value === value) {
        arr[i].selected = true;
      }
    }
  };

  timeIn.addEventListener('change', function (evt) {
    timeCheck(timeOutOption, evt.currentTarget.value);
  });

  timeOut.addEventListener('change', function (evt) {
    timeCheck(timeInOption, evt.currentTarget.value);
  });

  var elementsDisabled = function (elements) {
    for (var it = 0; it < elements.length; it++) {
      elements[it].disabled = true;
    }
  };

  var elementsEnabled = function (elements) {
    for (var it = 0; it < elements.length; it++) {
      elements[it].disabled = false;
    }
  };

  // Сообщение об успешной отправке
  var successSend = function () {
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var successElement = templateSuccess.cloneNode(true);
    window.pin.cleanPins();
    window.map.main.appendChild(successElement);


    // Закрытие успешного сообщения
    var successMessage = document.querySelector('.success');

    successMessage.addEventListener('click', function () {
      successMessageCloseClickHandler();
    });

    var escPressKeydownHandler = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        successMessageCloseClickHandler();
      }
    };

    document.addEventListener('keydown', escPressKeydownHandler);

    var successMessageCloseClickHandler = function () {
      window.map.main.removeChild(successElement);
      document.removeEventListener('keydown', escPressKeydownHandler);
    };
  };

  // Кнопка отправки формы
  var form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successSend, window.map.errorHandler);
    evt.preventDefault();
  });

  window.form = {
    form: form,
    formElement: formElement,
    elementsDisabled: elementsDisabled,
    elementsEnabled: elementsEnabled
  };

})();
