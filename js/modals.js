'use strict';

function ready() {
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
    link.addEventListener('click', function (e) {
      e.preventDefault();
      popup.classList.add(showClass);
    });

    // Close login modal
    closeButton.addEventListener('click', function () {
      if (popup.classList.contains(showClass)) {
        popup.classList.remove(showClass);
        popup.classList.remove(errorClass);
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
/*   function mapModal() {
    let links = document.querySelectorAll('.js-button-map');
    let closeButton = document.querySelector('#map-modal-close-button');
    let popup = document.querySelector('#modal-map');
  }
 */
  loginModal();
  // mapModal();
  // photoModal();
}

document.addEventListener('DOMContentLoaded', ready);
