'use strict';

(function () {
/* Моковые данные */
  var MOCK = {
    author: {
      avatar: [
        'img/avatars/user01.png',
        'img/avatars/user02.png',
        'img/avatars/user03.png',
        'img/avatars/user04.png',
        'img/avatars/user05.png',
        'img/avatars/user06.png',
        'img/avatars/user07.png',
        'img/avatars/user08.png'
      ]
    },

    offer: {
      title: [
        'Большая квартира в центре',
        'Маленькая квартира на окраине',
        'Царские аппартаменты',
        'Нецарские аппартаменты',
        'Старый маленький дом',
        'Большой дом с бассейном',
        'Шалаш на дереве',
        'Уютное бунгало'
      ],
      address: '',
      price: {
        min: 1000,
        max: 100000
      },
      type: ['palace', 'flat', 'house', 'bungalo'],
      rooms: {
        min: 1,
        max: 5
      },
      guests: {
        min: 1,
        max: 10
      },
      checkin: ['12:00', '13:00', '14:00'],
      checkout: ['12:00', '13:00', '14:00'],
      features: [
        'wifi',
        'dishwasher',
        'parking',
        'washer',
        'elevator',
        'conditioner'
      ],
      description: '',
      photos: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ]
    },

    location: {
      x: {
        min: 0,
        max: 1200
      },
      y: {
        min: 130,
        max: 630
      }
    }
  };

  // Количество предложений
  var COUNTER_ADS = 8;

  /* Типы жилья */
  var placeType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  // Генерируем объекты объявлений
  var getData = function () {
    var arr = [];

    for (var i = 0; i <= COUNTER_ADS; i++) {
      arr[i] = {
        author: {
          avatar: MOCK.author.avatar[window.util.randomNumber(0, MOCK.author.avatar.length - 1)]
        },
        offer: {
          title: MOCK.offer.title[window.util.randomNumber(0, MOCK.offer.title.length - 1)],
          address: MOCK.offer.address,
          price: window.util.randomNumber(MOCK.offer.price.min, MOCK.offer.price.max),
          type: MOCK.offer.type[window.util.randomNumber(0, MOCK.offer.type.length - 1)],
          rooms: window.util.randomNumber(MOCK.offer.rooms.min, MOCK.offer.rooms.max),
          guests: window.util.randomNumber(MOCK.offer.guests.min, MOCK.offer.guests.max),
          checkin: MOCK.offer.checkin[window.util.randomNumber(0, MOCK.offer.checkin.length - 1)],
          checkout: MOCK.offer.checkout[window.util.randomNumber(0, MOCK.offer.checkout.length - 1)],
          features: MOCK.offer.features,
          description: MOCK.offer.description,
          photos: MOCK.offer.photos
        },
        location: {
          x: window.util.randomNumber(MOCK.location.x.min, MOCK.location.x.max),
          y: window.util.randomNumber(MOCK.location.y.min, MOCK.location.y.max)
        }
      };
    }

    return arr;
  };

  // Все объявления
  var allData = getData();

  window.data = {
    placeType: placeType,
    allData: allData
  };
})();
