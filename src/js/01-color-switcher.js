// функция рандомного изменения цвета
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

//   ссылки на елементы
const refs = {
  btnStart : document.querySelector('[data-start]'),
  btnStop : document.querySelector('[data-stop]'),
  body : document.querySelector('body'),
};

// в начале кнопка stop не активна
refs.btnStop.disabled = true;

// инициализируем setInterval
let timerId = null;

//фун. смены не активной кнопки stop => start и смены цвета боди
function onBtnClickChangeStatus(){
  switch(refs.btnStop.disabled){
    case true:
      refs.btnStop.disabled = false;
      refs.btnStart.disabled = true;
      timerId = setInterval(changeColorBody, 1000);
      break;

    case false:
        refs.btnStop.disabled = true;
        refs.btnStart.disabled = false;
        clearInterval(timerId)
        break;

        default:
          console.log("Invalid subscription type");
  }
}

//   подписываем слушателей на кнопки
   refs.btnStart.addEventListener('click', onBtnClickChangeStatus);
   refs.btnStop.addEventListener('click', onBtnClickChangeStatus);

// фун. изменения цвета фона боди при клике на start
function changeColorBody() {
  refs.body.style.backgroundColor = getRandomHexColor()
}












// console.log('1');
// setTimeout(() => {console.log('hallo')}, 2000)
// console.log('2');

// const logger = time => {
//     console.log(`hallo ${time}`);
// }

// const timerId = setTimeout(logger, 2000, 'mango')





// console.log('1');

// const timerId = setInterval(logger, 2000, 'mango')
// console.log('2');
// const random = Math.random() > 0.3
// console.log(random);
// if(random){
//     clearInterval(timerId)
// }

// const PROMT_DELAY = 1000
// const MAX_PROMT_ATTEMPTS = 3

// let coun = 0 
// let = false

// const intervalId = setInterval(() => {
//   if(coun === MAX_PROMT_ATTEMPTS){
//     console.log('stop');
//     clearInterval(intervalId)
//     return
//   }
//   console.log('do');
//   coun += 1
// }, PROMT_DELAY)