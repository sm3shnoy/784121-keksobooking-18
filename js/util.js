'use strict';

(function () {
  // Коды клавиш на клавиатуре
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var HTTP_STATUS_OK = 200;
  var GET = 'GET';
  var POST = 'POST';

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    HTTP_STATUS_OK: HTTP_STATUS_OK,
    GET: GET,
    POST: POST,

    // Генератор случайных координат
    randomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  };
})();
