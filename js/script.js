'use strict';

// Login modal
function loginModal() {
  let link = document.querySelector('#login-link');
  let popup = document.querySelector('#modal-login');
  let closeButton = document.querySelector('#login-modal-close-button');

  let showClass = 'modal-show';
  let errorClass = 'modal-error';
  let errorFieldClass = 'field-error';

  let form = document.querySelector('#login-form');
  let login = document.querySelector('#user-login');
  let password = document.querySelector('#user-password');

  // Show login modal
  link.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add(showClass);
  });

  // Close login modal
  let closeModal = () => {
    popup.classList.remove(showClass);
    popup.classList.remove(errorClass);
  };

  closeButton.addEventListener('click', () => {
    if (popup.classList.contains(showClass)) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Login form submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!login.value || !password.value) {
      if (!login.value) {
        login.classList.add(errorFieldClass);
      } else {
        login.classList.remove(errorFieldClass);
      }

      if (!password.value) {
        password.classList.add(errorFieldClass);
      } else {
        password.classList.remove(errorFieldClass);
      }

      popup.classList.remove(errorClass);
      // Hack: for toggle class
      popup.clientWidth;
      popup.classList.add(errorClass);
    } else {
      this.submit();
    }
  });
}

// Map modal
function mapModal() {
  let links = document.querySelectorAll('.js-button-map');
  let popup = document.querySelector('#modal-map');
  let closeButton = document.querySelector('#map-modal-close-button');
  let showClass = 'modal-show';

  // Show map modal
  links.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      popup.classList.add(showClass);
    });
  });

  // Close map modal
  let closeModal = () => {
    popup.classList.remove(showClass);
  };

  closeButton.addEventListener('click', () => {
    if (popup.classList.contains(showClass)) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// Gallery
function gallery() {
  let prevButton = document.querySelector('#gallery-button-back');
  let nextButton = document.querySelector('#gallery-button-next');
  let slides = document.querySelectorAll('.gallery-slide');
  let currentSlideIndex = 0;
  let showSlideClass = 'gallery-slide-show';
  let bigImage = document.querySelector('#img-big');

  let links = document.querySelectorAll('.gallery-slide a');
  let popup = document.querySelector('#modal-photo');
  let closeButton = document.querySelector('#photo-modal-close-button');
  let showClass = 'modal-show';

  function goToSlide(slideIndex) {
    slides[currentSlideIndex].classList.remove(showSlideClass);
    currentSlideIndex = (slideIndex + slides.length) % slides.length;
    slides[currentSlideIndex].classList.add(showSlideClass);

    let bigImageSrc = slides[currentSlideIndex]
      .querySelector('img')
      .getAttribute('src')
      .replace('small', 'big');
    bigImage.setAttribute('src', bigImageSrc);
  }

  function prevSlide() {
    goToSlide(currentSlideIndex - 1);
  }

  function nextSlide() {
    goToSlide(currentSlideIndex + 1);
  }

  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
  });

  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
  });

  function galleryKeyboardActions(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    }

    if (e.key === 'ArrowRight') {
      nextSlide();
    }
  }

  // Open photo modal
  links.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      popup.classList.add(showClass);
      document.addEventListener('keydown', galleryKeyboardActions);

      // Close photo modal by overlay click
      let modalOverlay = document.querySelector('.modal-show ~ .modal-overlay');
      modalOverlay.addEventListener('click', () => {
        closeModal();
      });
    });
  });

  // Close photo modal
  let closeModal = () => {
    popup.classList.remove(showClass);
    document.removeEventListener('keydown', galleryKeyboardActions);
  };

  closeButton.addEventListener('click', () => {
    if (popup.classList.contains(showClass)) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function productPhotos() {
  let links = document.querySelectorAll('#product-photo-preview a');
  let fullPhoto = document.querySelector('#product-photo-full img');

  links.forEach((item) => {
    item.addEventListener('click', function () {
      let fullPhotoSrc = this.querySelector('img').getAttribute('src').replace('small', 'big');
      let fullPhotoAlt = this.querySelector('img').getAttribute('alt');
      fullPhoto.setAttribute('src', fullPhotoSrc);
      fullPhoto.setAttribute('alt', fullPhotoAlt);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loginModal();
  mapModal();
  if (document.querySelector('#gallery')) {
    gallery();
  }
  if (document.querySelector('#product-photos')) {
    productPhotos();
  }
});
