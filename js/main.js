'use strict';

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

/* Типы жилья */
var placeType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

// Количество предложений
var COUNTER_ADS = 8;

// Пины на странице
var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

/* Карточки предложений */
var similarCardListElement = document.querySelector('.map__filters-container');
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

// Генератор случайных координат
var randomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
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
        title: MOCK.offer.title[randomNumber(0, MOCK.offer.title.length - 1)],
        address: MOCK.offer.address,
        price: randomNumber(MOCK.offer.price.min, MOCK.offer.price.max),
        type: MOCK.offer.type[randomNumber(0, MOCK.offer.type.length - 1)],
        rooms: randomNumber(MOCK.offer.rooms.min, MOCK.offer.rooms.max),
        guests: randomNumber(MOCK.offer.guests.min, MOCK.offer.guests.max),
        checkin: MOCK.offer.checkin[randomNumber(0, MOCK.offer.checkin.length - 1)],
        checkout: MOCK.offer.checkout[randomNumber(0, MOCK.offer.checkout.length - 1)],
        features: MOCK.offer.features[randomNumber(0, MOCK.offer.features.length - 1)],
        description: MOCK.offer.description,
        photos: MOCK.offer.photos[randomNumber(0, MOCK.offer.photos.length - 1)]
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

// Генерируем пины
var renderedData = function (arr) {
  var adsElement = similarPinTemplate.cloneNode(true);

  adsElement.style.left = arr.location.x + 'px';
  adsElement.style.top = arr.location.y + 'px';
  adsElement.querySelector('img').src = arr.author.avatar;
  adsElement.querySelector('img').alt = arr.offer.title;

  return adsElement;
};

/* Генерируем карточки */
var renderedCard = function (arr) {
  var cardElement = similarCardTemplate.cloneNode(true);

  var featureLi = document.createElement('li');
  featureLi.className = 'popup__feature ' + 'popup__feature--' + arr.offer.features;
  featureLi.innerHTML = arr.offer.features;

  /* Карточки */
  cardElement.querySelector('.popup__title').textContent = arr.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + ' р. / ночь';
  cardElement.querySelector('.popup__type').textContent = placeType[arr.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
  cardElement.querySelector('.popup__features').appendChild(featureLi);
  cardElement.querySelector('.popup__description').textContent = arr.offer.description;
  cardElement.querySelector('.popup__photo').src = arr.offer.photos;
  cardElement.querySelector('.popup__avatar').textContent = arr.author.avatar;

  return cardElement;
};


// Создаем фрагмент для вставки на страницу
var pinFragment = document.createDocumentFragment();

for (var i = 0; i < allData.length; i++) {
  pinFragment.appendChild(renderedData(allData[i]));
}

similarListElement.appendChild(pinFragment);
similarCardListElement.insertAdjacentElement('afterbegin', renderedCard(allData[0]));
