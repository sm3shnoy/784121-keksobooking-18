'use strict';

(function () {
  var location = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  /* Типы жилья */
  var PlaceType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.data = {
    PlaceType: PlaceType,
    location: location
  };
})();
