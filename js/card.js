'use strict';

(function () {
  /* Карточки предложений */
  var similarCardListElement = document.querySelector('.map__filters-container');
  var similarCardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  window.card = {
    similarCardListElement: similarCardListElement,

    /* Генерируем карточки */
    renderedCard: function (arr) {
      var cardElement = similarCardTemplate.cloneNode(true);

      // Очищаем список фотографий перед добавлением
      cardElement.querySelector('.popup__features').innerHTML = '';

      // Цикл добавления услуг
      for (var i = 0; i < arr.offer.features.length; i++) {
        var featureLi = document.createElement('li');

        featureLi.className = 'popup__feature ' + 'popup__feature--' + arr.offer.features[i];
        featureLi.innerHTML = arr.offer.features[i];

        cardElement.querySelector('.popup__features').appendChild(featureLi);
      }

      // Очищаем список фотографий перед добавлением
      cardElement.querySelector('.popup__photos').innerHTML = '';

      // Цикл добавления фотографий жилья
      for (var j = 0; j < arr.offer.photos.length; j++) {
        var photoImg = document.createElement('img');

        photoImg.className = 'popup__photo';
        photoImg.src = arr.offer.photos[j];
        photoImg.alt = 'Фотография жилья';
        photoImg.style.width = 45 + 'px';
        photoImg.style.height = 40 + 'px';

        cardElement.querySelector('.popup__photos').appendChild(photoImg);
      }

      /* Карточки */
      cardElement.querySelector('.popup__title').textContent = arr.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + ' р. / ночь';
      cardElement.querySelector('.popup__type').textContent = window.data.placeType[arr.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = arr.offer.description;
      cardElement.querySelector('.popup__avatar').src = arr.author.avatar;

      // Закрываем карточку при нажатии на крестик внутри карточки
      var cardClose = cardElement.querySelector('.popup__close');

      var cardCloseClickHandler = function () {
        var card = document.querySelector('.map__card');

        if (card) {
          card.remove();
        }
      };

      var cardCloseEscKeydownHandler = function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          cardCloseClickHandler();
        }

        cardClose.removeEventListener('click', cardCloseClickHandler);
        document.removeEventListener('keydown', cardCloseEscKeydownHandler);
      };

      cardClose.addEventListener('click', cardCloseClickHandler);
      document.addEventListener('keydown', cardCloseEscKeydownHandler);

      return cardElement;
    }
  };
})();
