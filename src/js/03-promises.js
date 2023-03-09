
// Obtener los elementos del formulario
const form = document.querySelector('.form');
const delayInput = form.querySelector('[name="delay"]');
const stepInput = form.querySelector('[name="step"]');
const amountInput = form.querySelector('[name="amount"]');

// Función para crear una Promise con un retraso dado
function createPromise(position, delay) {
// Devuelve una Promise que se resuelve o se rechaza después de un tiempo de retraso
return new Promise((resolve, reject) => {
const shouldResolve = Math.random() > 0.3;
setTimeout(() => {
if (shouldResolve) {
resolve({ position, delay });
} else {
reject({ position, delay });
}
}, delay);
});
}

// Función que se ejecuta cuando se envía el formulario
async function handleSubmit(event) {
event.preventDefault();

// Obtener los valores del formulario
const delay = parseInt(delayInput.value);
const step = parseInt(stepInput.value);
const amount = parseInt(amountInput.value);

// Crear un array de Promises con los retrasos incrementales
const promises = Array.from({ length: amount }, (_, i) => {
const position = i + 1;
const promiseDelay = delay + i * step;
return createPromise(position, promiseDelay);
});
  // Ejecutar todas las Promises  y mostrar los resultados
  for (const result of await Promise.allSettled(promises)) {
    const { position, delay } = result.value || result.reason;
    const promiseDelay = delay + step;

    if (result.status === 'fulfilled') {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    }

    // Esperar "step" ms antes de imprimir el próximo mensaje
    await new Promise(resolve => setTimeout(resolve, step));
    }

    }

// Escuchar el evento submit en el formulario
form.addEventListener('submit', handleSubmit);
