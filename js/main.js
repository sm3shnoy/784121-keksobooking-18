'use strict';

// Координаты для позиционирования (location)
var minY = 130;
var maxY = 630;
var minX = 0;
var maxX = 1200;

// Количество предложений
var COUNTER_ADS = 8;

// Элементы на странице для отображения объявлений
var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

// Генератор случайных координат
var randomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// Генерируем объекты объявлений
var adsGenerator = function () {
  var MOCK = [];

  for (var i = 0; i <= COUNTER_ADS; i++) {
    MOCK[i] = {
      'author': {
        'avatar': [
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

      'offer': {
        'title': [
          'Большая квартира в центре',
          'Маленькая квартира на окраине',
          'Царские аппартаменты',
          'Нецарские аппартаменты',
          'Старый маленький дом',
          'Большой дом с бассейном',
          'Шалаш на дереве',
          'Уютное бунгало'
        ],
        'address': '{{location.x}}, {{location.y}}',
        'price': {
          min: 1000,
          max: 100000
        },
        'type': ['palace', 'flat', 'house', 'bungalo'],
        'rooms': {
          min: 1,
          max: 5
        },
        'guests': {
          min: 1,
          max: 10
        },
        'checkin': ['12:00', '13:00', '14:00'],
        'checkout': ['12:00', '13:00', '14:00'],
        'features': [
          'wifi',
          'dishwasher',
          'parking',
          'washer',
          'elevator',
          'conditioner'
        ],
        'description': '',
        'photos': [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ]
      },

      'location': {
        'x': randomNumber(minX, maxX),
        'y': randomNumber(minY, maxY)
      }
    };
  }

  return MOCK;
};

// Убираем класс faded у блока map
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Все объявления
var MOCK = adsGenerator();

var renderedAds = function (ad) {
  var adsElement = similarPinTemplate.cloneNode(true);

  adsElement.style.left = ad.location.x + 'px';
  adsElement.style.top = ad.location.y + 'px';
  adsElement.querySelector('img').src = ad.author.avatar[randomNumber(0, ad.author.avatar.length - 1)];
  adsElement.querySelector('img').alt = ad.offer.title[randomNumber(0, ad.offer.title.length - 1)];

  return adsElement;
};

// Создаем фрагмент для вставки на страницу
var fragment = document.createDocumentFragment();
for (var i = 0; i < MOCK.length; i++) {
  fragment.appendChild(renderedAds(MOCK[i]));
}
similarListElement.appendChild(fragment);
