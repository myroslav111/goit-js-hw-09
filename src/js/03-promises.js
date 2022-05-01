// добавляем библиотеку notiflix.
import  {  Notify  }  from  'notiflix/build/notiflix-notify-aio';

// refs
const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('button')
}

// подписываем форму и кнопку
refs.form.addEventListener('input', onFormSubmit)
refs.btn.addEventListener('click', onBtnClick)

// фун. сбора велью формы
const formData = {}
function onFormSubmit (event) {
  event.preventDefault()
    formData[event.target.name] = Number(event.target.value)
}

// фун. запуска промисов
function onBtnClick(event) {
  event.preventDefault()
  Promise.all(amountPromis(formData))
}

// фун. создающая масив из промисов
function amountPromis(obj) {
  const {delay, step, amount} = obj
  const arr = []
  let delays = delay

  for(let position = 1; position <= amount; position += 1){
      delays += step
      arr.push(createPromise(position, delays).then(({ position, delays }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delays}ms`);
      })
      .catch(({ position, delays }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delays}ms`);
      }))
  }
  return arr
}

// фун. создающая промис
  function createPromise(position, delays) {
      const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {

      setTimeout(() => {
            if (shouldResolve) {
                    resolve({ position, delays })
                  } else {
                    reject({ position, delays})
                  }
      }, delays)
   })
}





