import moment from 'moment/moment';
import Calendar from './Calendar';

export default class CalendarController {
  constructor(calendar) {
    this.calendar = calendar;
    this.body = document.querySelector('tbody');
    this.title = document.querySelector('.title');
    this.nextMonthBtn = document.querySelector('.next');
    this.previousMonthBtn = document.querySelector('.previous');

    this.selected = {
      there: null,
      back: null,
    };
  }

  render() {
    this.body.innerHTML = this.calendar.getElements();
    this.getTitle();

    this.days = document.querySelectorAll('.day');

    this.getAvailableDates();
    this.showSelectedDate();
  }

  getTitle() {
    this.title.innerHTML = this.calendar.title;
    this.title.dataset.month = this.calendar.month;
    this.title.dataset.year = this.calendar.year;
  }

  init() {
    this.render();

    this.previousMonthBtn.onclick = () => {
      this.calendar = new Calendar(this.title.dataset.year, this.title.dataset.month - 2);
      this.render();
    };

    this.nextMonthBtn.onclick = () => {
      this.calendar = new Calendar(this.title.dataset.year, this.title.dataset.month);
      this.render();
    };
  }

  showSelectedDate() {
    this.days.forEach((day) => {
      if (day.dataset.date === this.selected.there) {
        day.classList.add('selected');
      }

      if (day.dataset.date === this.selected.back) {
        day.classList.add('selected');
      }

      const there = this.getMoment(this.selected.there);
      const back = this.getMoment(this.selected.back);

      const dayBetween = this.getMoment(day.dataset.date);

      if (dayBetween > there && dayBetween < back) {
        day.classList.add('selected');
      }
    });
  }

  getAvailableDates() {
    this.days.forEach((day) => {
      if (day.dataset.date === moment().format('DD.MM.YYYY')) {
        day.classList.add('today');
        this.today = day.dataset.date;
      }

      const dayMoment = this.getMoment(day.dataset.date);
      const todayMoment = this.getMoment(this.today);

      if (dayMoment >= todayMoment) {
        day.classList.add('available');
      } else {
        day.classList.add('outdated');
      }
    });

    this.availableDates = document.querySelectorAll('.available');
  }

  getMoment(date) {
    this.moment = moment(date, 'DD.MM.YYYY', true);
    return this.moment;
  }

  changeCursor(pointer) {
    this.days.forEach((day) => {
      if (pointer && day.classList.contains('available')) {
        day.classList.remove('not-allowed');
        day.classList.add('pointer');
      } else {
        (() => {
          const dayMoment = this.getMoment(day.dataset.date);
          const there = this.getMoment(this.selected.there);

          if (dayMoment <= there) {
            day.classList.add('not-allowed');
          }
        })();
      }
    });
  }
}
