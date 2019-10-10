'use strict';

(function () {
  // Коды клавиш на клавиатуре
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,

    // Генератор случайных координат
    randomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  };
})();
