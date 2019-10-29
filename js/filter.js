'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var getHousingType = function (el) {
    return housingType.value === 'any' ? true : el.offer.type === housingType.value;
  };

  var filters = function (data) {
    return data.filter(function (el) {
      return getHousingType(el);
    }).slice(0, 5);
  };

  mapFilters.addEventListener('change', function () {
    removeElements();
    window.map.successHandler(window.data);
  });

  var removeElements = function () {
    var elements = document.querySelectorAll('.map__pin:not(.map__pin--main');
    elements.forEach(function (it) {
      it.remove();
    });
  };

  window.filter = {
    filters: filters
  };
})();
