'use strict';

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
var getData = function () {
  var arr = [];

  for (var i = 0; i <= COUNTER_ADS; i++) {
    arr[i] = {
      author: {
        avatar: MOCK.author.avatar[randomNumber(0, MOCK.author.avatar.length - 1)]
      },
      offer: {
        title: MOCK.offer.title[randomNumber(0, MOCK.offer.title.length - 1)]
      },
      location: {
        x: randomNumber(MOCK.location.x.min, MOCK.location.x.max),
        y: randomNumber(MOCK.location.y.min, MOCK.location.y.max)
      }
    };
  }

  return arr;
};

// Убираем класс faded у блока map
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Все объявления
var allData = getData();

var renderedData = function (arr) {
  var adsElement = similarPinTemplate.cloneNode(true);

  adsElement.style.left = arr.location.x + 'px';
  adsElement.style.top = arr.location.y + 'px';
  adsElement.querySelector('img').src = arr.author.avatar;
  adsElement.querySelector('img').alt = arr.offer.title;

  return adsElement;
};

// Создаем фрагмент для вставки на страницу
var fragment = document.createDocumentFragment();
for (var i = 0; i < allData.length; i++) {
  fragment.appendChild(renderedData(allData[i]));
}
similarListElement.appendChild(fragment);
