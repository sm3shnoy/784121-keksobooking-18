'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapFeatures = mapFilters.querySelector('#housing-features');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var featuresItems = mapFeatures.querySelectorAll('input[type="checkbox"]:checked');

  var checkedFeatures = [];

  var priceList = {
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
    return housingRooms.value === 'any' ? true : el.offer.rooms.toString() === housingRooms.value;
  };

  var getHousingGuests = function (el) {
    return housingGuests.value === 'any' ? true : el.offer.guests.toString() === housingGuests.value;
  };

  var getHousingPrice = function (el) {
    switch (housingPrice.value) {
      case priceList.LOW: return el.offer.price <= priceList.MIN;
      case priceList.MID: return el.offer.price >= priceList.MIN && el.offer.price <= priceList.MAX;
      case priceList.HIGH: return el.offer.price >= priceList.MAX;
      default: return true;
    }
  };

  checkedFeatures = [].map.call(featuresItems, function (el) {
    return el.value;
  });

  var getFeaturesList = function (el) {
    return checkedFeatures.every(function (currentFeature) {
      return el.offer.features.includes(currentFeature);
    });
  };

  var filters = function (data) {
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

    window.map.renderPins(filters(window.adsData));
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
