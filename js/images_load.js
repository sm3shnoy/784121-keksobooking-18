'use strict';

(function () {
  var avatarWrapper = document.querySelector('.ad-form-header__preview img');
  var imagesContainer = document.querySelector('.ad-form__photo-container');
  var avatar = document.querySelector('#avatar');
  var images = document.querySelector('#images');
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var ImagesStyles = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  var changeAvatar = function (src) {
    avatarWrapper.src = src;
  };

  var removeEmptyImgWrap = function () {
    var emptyImgWrap = document.querySelector('.ad-form__photo--empty');
    if (emptyImgWrap) {
      emptyImgWrap.remove();
    }
  };

  var addImages = function (src) {
    var newImageWrap = document.createElement('div');
    var image = document.createElement('img');
    newImageWrap.classList.add('ad-form__photo');
    newImageWrap.classList.add('ad-form__photo--added');
    image.src = src;
    image.style.width = ImagesStyles.WIDTH;
    image.style.height = ImagesStyles.HEIGHT;
    image.style.borderRadius = ImagesStyles.BORDER_RADIUS;
    newImageWrap.appendChild(image);
    imagesContainer.appendChild(newImageWrap);
    removeEmptyImgWrap();
  };

  var addEmptyImgWrap = function () {
    if (!document.querySelector('.ad-form__photo--empty')) {
      var emptyImgWrap = document.createElement('div');
      emptyImgWrap.classList.add('ad-form__photo');
      emptyImgWrap.classList.add('ad-form__photo--empty');
      imagesContainer.appendChild(emptyImgWrap);
    }
  };

  var loadFile = function (chooser, func) {
    var files = Array.from(chooser.files);
    if (files) {
      files.forEach(function (it) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          func(evt.target.result);
        });
        reader.readAsDataURL(it);
      });
    }
  };

  var removeImages = function () {
    avatarWrapper.src = DEFAULT_AVATAR;
    var addedImages = document.querySelectorAll('.ad-form__photo--added');
    if (addedImages) {
      addedImages.forEach(function (it) {
        it.remove();
      });
    }
    addEmptyImgWrap();
  };

  var onAvatarChange = function (evt) {
    loadFile(evt.target, changeAvatar);
  };

  var onPhotoChange = function (evt) {
    loadFile(evt.target, addImages);
  };

  var activate = function () {
    avatar.addEventListener('change', onAvatarChange);
    images.addEventListener('change', onPhotoChange);
  };

  var deactivate = function () {
    avatar.removeEventListener('change', onAvatarChange);
    images.removeEventListener('change', onPhotoChange);
  };

  window.loadImage = {
    activate: activate,
    deactivate: deactivate,
    remove: removeImages
  };
})();
