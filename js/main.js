'use strict';

// Переменные для объектов в предложении (offer)
var TITLE = 'Заголовок';
var PRICE = 100000;
var TYPE = 'palace';
var ROOMS = 3;
var GUESTS = 5;
var CHECKIN = '12:00';
var CHECKOUT = '13:00';
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = 'Описание';
var PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
  var ads = [];

  for (var i = 0; i <= COUNTER_ADS; i++) {
    ads[i] = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + i + '.png'
      },

      'offer': {
        'title': TITLE,
        'address': '{{location.x}}, {{location.y}}',
        'price': PRICE,
        'type': TYPE[0],
        'rooms': ROOMS,
        'guests': GUESTS,
        'checkin': CHECKIN,
        'checkout': CHECKOUT,
        'features': FEATURES[0],
        'description': DESCRIPTION,
        'photos': PHOTO
      },

      'location': {
        'x': randomNumber(minX, maxX),
        'y': randomNumber(minY, maxY)
      }
    };
  }

  return ads;
};

// Убираем класс faded у блока map
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Все объявления
var ads = adsGenerator();

var renderedAds = function (ad) {
  var adsElement = similarPinTemplate.cloneNode(true);

  adsElement.style.left = ad.location.x + 'px';
  adsElement.style.top = ad.location.y + 'px';
  adsElement.querySelector('img').src = ad.author.avatar;
  adsElement.querySelector('img').alt = ad.offer.title;

  return adsElement;
};

// Создаем фрагмент для вставки на страницу
var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderedAds(ads[i]));
}
similarListElement.appendChild(fragment);
