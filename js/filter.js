'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapFeatures = mapFilters.querySelectorAll('#housing-features input');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var PriceList = {
    LOW: 'low',
    MID: 'middle',
    HIGH: 'high',
    MIN: 10000,
    MAX: 50000
  };

  var getHousingType = function (el) {
    return housingType.value === 'any' ? true : el.offer.type === housingType.value;
  };

  var getHousingRooms = function (el) {
    return housingRooms.value === 'any' ? true : el.offer.rooms === Number(housingRooms.value);
  };

  var getHousingGuests = function (el) {
    return housingGuests.value === 'any' ? true : el.offer.guests === Number(housingGuests.value);
  };

  var getHousingPrice = function (el) {
    switch (housingPrice.value) {
      case PriceList.LOW: return el.offer.price <= PriceList.MIN;
      case PriceList.MID: return el.offer.price >= PriceList.MIN && el.offer.price <= PriceList.MAX;
      case PriceList.HIGH: return el.offer.price >= PriceList.MAX;
      default: return true;
    }
  };


  var getFeaturesList = function (el) {
    return Array.from(mapFeatures).filter(function (element) {
      return element.checked;
    }).map(function (element) {
      return element.value;
    }).every(function (currentFeature) {
      return el.offer.features.includes(currentFeature);
    });
  };

  var getFilters = function (data) {
    return data.filter(function (el) {
      return getHousingType(el) &&
             getHousingPrice(el) &&
             getHousingRooms(el) &&
             getHousingGuests(el) &&
             getFeaturesList(el);
    }).slice(0, 5);
  };

  mapFilters.addEventListener('change', function () {
    removeElements();

    window.map.renderPins(getFilters(window.adsData));
  });

  var removeElements = function () {
    var elements = document.querySelectorAll('.map__pin:not(.map__pin--main');
    elements.forEach(function (it) {
      it.remove();
    });
  };

  window.filter = {
    getFilters: getFilters
  };
})();
