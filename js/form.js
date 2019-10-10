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

  window.form = {
    formElement: formElement,

    elementsDisabled: function (elements) {
      for (var it = 0; it < elements.length; it++) {
        elements[it].disabled = true;
      }
    },

    elementsEnabled: function (elements) {
      for (var it = 0; it < elements.length; it++) {
        elements[it].disabled = false;
      }
    }
  };

})();
