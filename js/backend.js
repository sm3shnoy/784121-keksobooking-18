'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  window.backend = {
    load: function (successHandler, errorHandler) {
      var URL = 'https://js.dump.academy/keksobooking/data';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          successHandler(xhr.response);
        } else {
          errorHandler('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка!');
      });

      xhr.open('GET', URL);
      xhr.send();
    },

    save: function (data, successHandler, errorHandler) {
      var URL = 'https://js.dump.academy/keksobooking';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          successHandler(xhr.response);
        } else {
          errorHandler('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка!');
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
