// добавляем библиотеку flatpickr
import flatpickr from "flatpickr";

// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

// добавляем библиотеку notiflix.
import  {  Notify  }  from  'notiflix/build/notiflix-notify-aio' ; 

// создаем ссылки на ел.
const refs = {
    timerDays: document.querySelector('[data-days]'),
    timerHours: document.querySelector('[data-hours]'),
    timerMinutes: document.querySelector('[data-minutes]'),
    timerSeconds: document.querySelector('[data-seconds]'),
    btnStart: document.querySelector('[data-start]'),
    input: document.querySelector('#datetime-picker'),
    body: document.querySelector('body')
}

// изначально кнопка start не активна
refs.btnStart.disabled = true;

// заявляем переменную для фун. onBtnClickStart
let intervalId = null;

const INTERVAL = 1000
// добавляем подписку к кнопке
refs.btnStart.addEventListener('click', onBtnClickStart)

// объект параметров 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  // metod flatpickr
  // Если пользователь выбрал дату в прошлом, alert с текстом "Please choose a date in the future".
  // Если пользователь выбрал валидную дату (в будущем),   кнопка «Start» становится активной.
    onClose(selectedDates) {
      const userSelyctedData = this.selectedDates[0].getTime()
      const currentData = Date.now()
      const deltaTime = userSelyctedData - currentData
      
      switch(deltaTime > 0){
        case true:
          refs.btnStart.disabled = false;
          break;
      
          case false:
            Notify.failure("Please choose a date in the future");
            refs.btnStart.disabled = true
            break;

            default:
              console.log("Invalid subscription type");
      }
    },
  };

// инициализируем flatpickr
const inputData = flatpickr("#datetime-picker", options);

// фун. обновление таймера
function onBtnClickStart (){
  if(intervalId !== null){
    return
  }
  const startCount = inputData.selectedDates[0]
  intervalId = setInterval(() => {
    if(startCount.getTime() <= Date.now()){
      clearInterval(intervalId)
      refs.body.insertAdjacentHTML("afterbegin", `<p>LOOK DOWN <span class="down">&darr;</span></p> <div class="bubbles">
      <img src="https://myroslav111.github.io/pets-projekt/my-pfoto/icons8-%D0%B3%D0%BE%D0%BC%D0%B5%D1%80-%D1%81%D0%B8%D0%BC%D0%BF%D1%81%D0%BE%D0%BD-48.png" >
      <img src="https://myroslav111.github.io/pets-projekt/my-pfoto/icons8-%D1%83%D0%BE%D0%BB%D1%82%D0%B5%D1%80-%D1%83%D0%B0%D0%B9%D1%82-48.png" >
      <img src="https://myroslav111.github.io/pets-projekt/my-pfoto/icons8-%D1%83%D0%BE%D0%BB%D1%82%D0%B5%D1%80-%D1%83%D0%B0%D0%B9%D1%82-48.png" >
      <img src="https://myroslav111.github.io/pets-projekt/my-pfoto/icons8-%D0%B3%D0%BE%D0%BC%D0%B5%D1%80-%D1%81%D0%B8%D0%BC%D0%BF%D1%81%D0%BE%D0%BD-48.png" >
      <img src="https://myroslav111.github.io/pets-projekt/my-pfoto/icons8-%D0%B3%D0%BE%D0%BC%D0%B5%D1%80-%D1%81%D0%B8%D0%BC%D0%BF%D1%81%D0%BE%D0%BD-48.png" >
      <img src="https://myroslav111.github.io/pets-projekt/my-pfoto/icons8-%D1%83%D0%BE%D0%BB%D1%82%D0%B5%D1%80-%D1%83%D0%B0%D0%B9%D1%82-48.png" >
      <img src="https://myroslav111.github.io/pets-projekt/my-pfoto/icons8-%D0%B3%D0%BE%D0%BC%D0%B5%D1%80-%D1%81%D0%B8%D0%BC%D0%BF%D1%81%D0%BE%D0%BD-48.png" >

  </div>`);
      return
    }
    const deltaTime = startCount - Date.now()
    const time = convertMs(deltaTime);
    updateClockFace(time);
  }, INTERVAL);
}

// фун. создания значений таймера 
function updateClockFace({ days, hours, minutes, seconds }){
    refs.timerDays.textContent = days
    refs.timerHours.textContent = hours
    refs.timerMinutes.textContent = minutes
    refs.timerSeconds.textContent = seconds
}

// фун. форматируй значение 
function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

// фун. приводит время в божеский вид
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour)) ;
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute)) ;
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)) ;
  
    return { days, hours, minutes, seconds };
  }
