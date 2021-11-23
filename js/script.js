'use strict';

// Login modal
class Modal {
  constructor() {
    const modal = this;
    for (const p in this.list) {
      let modalListEl = this.list[p];
      let links = document.querySelectorAll(modalListEl.links);

      // Show selected modal
      links.forEach((i) => {
        i.addEventListener('click', (e) => {
          e.preventDefault();
          modal.show(modalListEl);
        });
      });

      // Close current modal by click on close button
      document
        .querySelector(modalListEl.selector)
        .querySelector(`.${modal.selectors.modalClose}`)
        .addEventListener('click', (e) => {
          e.preventDefault();
          modal.close(modal.currentModal);
        });
    }

    document.querySelector(`.${this.selectors.modalOverlay}`).addEventListener('click', (e) => {
      e.preventDefault();
      if (this.currentModal) {
        this.close(this.currentModal);
      }
    });

    // Close current modal by Esc
    document.addEventListener('keydown', (e) => {
      if (this.currentModal) {
        if (e.key === 'Escape') {
          e.preventDefault();
          this.close(this.currentModal);
        }
      }
    });
  }

  currentModal = null;

  list = {
    login: {
      selector: '#modal-login',
      links: '#login-link',
    },
    map: {
      selector: '#modal-map',
      links: '.js-button-map',
    },
    photo: {
      selector: '#modal-photo',
      links: '.gallery-slide a',
    },
  };

  selectors = {
    modalShow: 'modal-show',
    modalClose: 'modal-close',
    modalOverlay: 'modal-overlay',
    bodyLock: 'modal-lock',
  };

  show(modal) {
    this.currentModal = modal;
    document
      .querySelector(modal.selector)
      .classList.add(this.selectors.modalShow);
    document.body.classList.add(this.selectors.bodyLock);
  }

  close(modal) {
    document
      .querySelector(modal.selector)
      .classList.remove(this.selectors.modalShow);
    document.body.classList.remove(this.selectors.bodyLock);
  }
}

function loginFormValidation() {
  let popup = document.querySelector('#modal-login');
  let errorClass = 'modal-error';
  let errorFieldClass = 'field-error';

  let form = document.querySelector('#login-form');
  let login = document.querySelector('#user-login');
  let password = document.querySelector('#user-password');

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

// Gallery
function gallery() {
  let prevButton = document.querySelector('#gallery-button-back');
  let nextButton = document.querySelector('#gallery-button-next');
  let slides = document.querySelectorAll('.gallery-slide');
  let currentSlideIndex = 0;
  let showSlideClass = 'gallery-slide-show';
  let bigImage = document.querySelector('#img-big');

  let links = document.querySelectorAll('.gallery-slide a');

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

  links.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      document.addEventListener('keydown', galleryKeyboardActions);
    });
  });
}

function productPhotos() {
  let links = document.querySelectorAll('#product-photo-preview a');
  let fullPhoto = document.querySelector('#product-photo-full img');

  links.forEach((item) => {
    item.addEventListener('click', function () {
      let fullPhotoSrc = this.querySelector('img')
        .getAttribute('src')
        .replace('small', 'big');
      let fullPhotoAlt = this.querySelector('img').getAttribute('alt');
      fullPhoto.setAttribute('src', fullPhotoSrc);
      fullPhoto.setAttribute('alt', fullPhotoAlt);
    });
  });
}

function showMobileMenu() {
  let burger = document.querySelector('.main-navigation-burger');
  burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    document
      .querySelector('.main-navigation-wrapper .container')
      .classList.toggle('active');
    document.body.classList.toggle('menu-lock');
  });

  document
    .querySelector('.user-navigation .login-link')
    .addEventListener('click', () => {
      document
        .querySelector('.main-navigation-wrapper .container')
        .classList.remove('active');
        burger.classList.remove('active');
      document.body.classList.remove('menu-lock');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loginFormValidation();

  if (document.querySelector('#gallery')) {
    gallery();
  }
  if (document.querySelector('#product-photos')) {
    productPhotos();
  }

  showMobileMenu();

  new Modal();
});

console.log('test');