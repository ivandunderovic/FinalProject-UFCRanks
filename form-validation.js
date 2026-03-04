document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  const success = document.getElementById('formSuccess');

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // reset poruka
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';
    success.style.display = 'none';

    let ok = true;

    if (nameInput.value.trim() === '') { nameError.textContent = 'Unesite ime i prezime.'; ok = false; }
    if (emailInput.value.trim() === '') { emailError.textContent = 'Unesite email.'; ok = false; }
    else if (!isEmailValid(emailInput.value.trim())) { emailError.textContent = 'Email format nije ispravan.'; ok = false; }
    if (subjectInput.value.trim() === '') { subjectError.textContent = 'Unesite predmet.'; ok = false; }
    if (messageInput.value.trim() === '') { messageError.textContent = 'Unesite poruku.'; ok = false; }

    if (ok) {
      success.style.display = 'block';
      success.textContent = 'Poruka je validirana (demo). Hvala!';
      form.reset();
    }
  });
});
