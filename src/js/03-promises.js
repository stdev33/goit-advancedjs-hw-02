import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;

  const promisesAmount = Number(amount.value);
  if (promisesAmount <= 0) {
    displayError('Error', 'Amount should be a positive number');
    return;
  }

  let firstDelay = Number(delay.value);
  const promiseStep = Number(step.value);

  for (let i = 0; i < promisesAmount; i += 1) {
    const promiseDelay = firstDelay + promiseStep * i;

    createPromise(i + 1, promiseDelay)
      .then(({ position, delay }) => {
        displaySuccess('✅', `Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        displayError('❌', `Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(
      payload => {
        if (shouldResolve) {
          resolve(payload);
        } else {
          reject(payload);
        }
      },
      delay,
      { position, delay }
    );
  });
}

function displaySuccess(title, message) {
  iziToast.success({
    title,
    message,
  });
}

function displayError(title, message) {
  iziToast.error({
    title,
    message,
  });
}
