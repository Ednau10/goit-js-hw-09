

const form = document.querySelector('.form');
const delayInput = form.querySelector('[name="delay"]');
const stepInput = form.querySelector('[name="step"]');
const amountInput = form.querySelector('[name="amount"]');


function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        setTimeout(() => {
        resolve({ position, delay });
      },delay)
    }else {
        setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });
}
async function handleSubmit(event) {
  event.preventDefault();


  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);


for(let i=0; i< amount; i++) {
    const promiseDelay = delay + i * step;
    const position= i +1;
    createPromise(position, promiseDelay)
    .then(({position,delay}) =>{
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notiflix.Notify.success(`✅ Promesa cumplida ${position} en ${delay}ms`);

    })
    .catch(({position,delay}) =>{
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notiflix.Notify.failure(`❌ Promesa rechazada ${position} en ${delay}ms`);
    });
  }

}

form.addEventListener('submit', handleSubmit);
