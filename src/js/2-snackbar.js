// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = Number(event.target.delay.value);
  const state = event.target.state.value;

  createPromise(delay, state)
    .then(message => {
      iziToast.success({ title: 'Успіх', message: message });
    })
    .catch(message => {
      iziToast.error({ title: 'Помилка', message: message });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
