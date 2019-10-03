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
// var placeType = {
//   palace: 'Дворец',
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало'
// };

// Количество предложений
var COUNTER_ADS = 8;

// Пины на странице
var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

/* Карточки предложений */
// var similarCardListElement = document.querySelector('.map__filters-container');
// var similarCardTemplate = document.querySelector('#card')
//     .content
//     .querySelector('.map__card');

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
        features: MOCK.offer.features,
        description: MOCK.offer.description,
        photos: MOCK.offer.photos
      },
      location: {
        x: randomNumber(MOCK.location.x.min, MOCK.location.x.max),
        y: randomNumber(MOCK.location.y.min, MOCK.location.y.max)
      }
    };
  }

  return arr;
};

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
// var renderedCard = function (arr) {
//   var cardElement = similarCardTemplate.cloneNode(true);

//   // Очищаем список фотографий перед добавлением
//   cardElement.querySelector('.popup__features').innerHTML = '';

//   // Цикл добавления услуг
//   for (var i = 0; i < arr.offer.features.length; i++) {
//     var featureLi = document.createElement('li');

//     featureLi.className = 'popup__feature ' + 'popup__feature--' + arr.offer.features[i];
//     featureLi.innerHTML = arr.offer.features[i];

//     cardElement.querySelector('.popup__features').appendChild(featureLi);
//   }

//   // Очищаем список фотографий перед добавлением
//   cardElement.querySelector('.popup__photos').innerHTML = '';

//   // Цикл добавления фотографий жилья
//   for (var j = 0; j < arr.offer.photos.length; j++) {
//     var photoImg = document.createElement('img');

//     photoImg.className = 'popup__photo';
//     photoImg.src = arr.offer.photos[j];
//     photoImg.alt = 'Фотография жилья';
//     photoImg.style.width = 45 + 'px';
//     photoImg.style.height = 40 + 'px';

//     cardElement.querySelector('.popup__photos').appendChild(photoImg);
//   }

//   /* Карточки */
//   cardElement.querySelector('.popup__title').textContent = arr.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + ' р. / ночь';
//   cardElement.querySelector('.popup__type').textContent = placeType[arr.offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
//   cardElement.querySelector('.popup__description').textContent = arr.offer.description;
//   cardElement.querySelector('.popup__avatar').src = arr.author.avatar;

//   return cardElement;
// };


// Создаем фрагмент для вставки на страницу
var pinFragment = document.createDocumentFragment();

for (var i = 0; i < allData.length; i++) {
  pinFragment.appendChild(renderedData(allData[i]));
}

// similarCardListElement.insertAdjacentElement('afterbegin', renderedCard(allData[0]));

var ENTER_KEYCODE = 13;

// Делаем группы полей неактивными
var formElement = document.querySelector('.ad-form--disabled');
var mapFilters = document.querySelector('.map__filters');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');


var elementsDisabled = function (elements) {
  for (var it = 0; it < elements.length; it++) {
    elements[it].disabled = true;
  }
};

var elementsEnabled = function (elements) {
  for (var it = 0; it < elements.length; it++) {
    elements[it].disabled = false;
  }
};

elementsDisabled(formElement);
elementsDisabled(mapFilters);

// Взаимодействие с меткой на карте
var mainPin = document.querySelector('.map__pin--main');
var addressField = document.querySelector('#address');

// Делаем активными элементы на странице при взаимодействии с пином на карте
var pinEnable = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  elementsEnabled(formElement);
  elementsEnabled(mapFilters);

  // Добавляем все возможные пины на карту
  similarListElement.appendChild(pinFragment);

  addressField.value = mainPin.style.left + ' ' + mainPin.style.top;
  addressField.setAttribute('readonly', true);
};

mainPin.addEventListener('mousedown', function () {
  pinEnable();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pinEnable();
  }
});

// Валидация формы
var adTitle = document.querySelector('#title');
var adPrice = document.querySelector('#price');
var typePlace = document.querySelector('#type');

// Проверка валидности заголовка
adTitle.addEventListener('invalid', function () {
  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity('Заголовок должен состоять максимум из 100 символов');
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Обязательное поле');
  } else {
    adTitle.setCustomValidity('');
  }
});

// Проверка валидности цены
adPrice.addEventListener('invalid', function () {
  if (adPrice.validity.tooLong) {
    adPrice.setCustomValidity('Максимальная цена 1 000 000');
  } else if (adPrice.validity.typeMismatch) {
    adPrice.setCustomValidity('Используйте только числа');
  } else if (adPrice.validity.valueMissing) {
    adPrice.setCustomValidity('Обязательное поле');
  } else {
    adPrice.setCustomValidity('');
  }
});

// Проверка валидности типа жилья
typePlace.addEventListener('change', function () {
  var price = 0;

  if (typePlace.value === 'bungalo') {
    price = 0;
  } else if (typePlace.value === 'flat') {
    price = 1000;
  } else if (typePlace.value === 'house') {
    price = 5000;
  } else {
    price = 10000;
  }

  adPrice.placeholder = price;
  adPrice.min = price;
});

// Проверка валидности комната - гость
var roomCount = document.querySelector('#room_number');
var guestsCount = document.querySelector('#capacity');
var guestSelectOption = guestsCount.querySelectorAll('option');

guestsCount.value = '1';

for (i = 0; i < guestsCount.length; i++) {
  if (guestsCount[i].value !== '1') {
    guestSelectOption[i].disabled = true;
  }
}

roomCount.addEventListener('change', function () {
  // Делаем доступными все поля при каждом изменении значения в селекте
  for (i = 0; i < guestsCount.length; i++) {
    guestSelectOption[i].disabled = false;
  }

  if (roomCount.value === '1') {
    guestsCount.value = '1';

    for (i = 0; i < guestsCount.length; i++) {
      if (guestsCount[i].value !== '1') {
        guestSelectOption[i].disabled = true;
      }
    }
  } else if (roomCount.value === '2') {
    guestsCount.value = '2';

    for (i = 0; i < guestsCount.length; i++) {
      if (guestsCount[i].value !== '2' && guestsCount[i].value !== '1') {
        guestSelectOption[i].disabled = true;
      }
    }
  } else if (roomCount.value === '3') {
    guestsCount.value = '3';

    for (i = 0; i < guestsCount.length; i++) {
      if (guestsCount[i].value !== '3' && guestsCount[i].value !== '2' && guestsCount[i].value !== '1') {
        guestSelectOption[i].disabled = true;
      }
    }
  } else {
    for (i = 0; i < guestsCount.length; i++) {
      guestsCount.value = '0';

      if (guestsCount[i].value !== '0') {
        guestSelectOption[i].disabled = true;
      }
    }
  }
});
