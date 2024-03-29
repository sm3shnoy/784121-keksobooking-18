'use strict';

(function () {

  var load = function (successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.HTTP_STATUS_OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка!');
    });

    xhr.open(window.util.GET, URL);
    xhr.send();
  };

  var save = function (data, successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.HTTP_STATUS_OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка!');
    });

    xhr.open(window.util.POST, URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
