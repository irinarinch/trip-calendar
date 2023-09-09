import moment from 'moment/moment';

export default class Calendar {
  constructor(year, month) {
    this.moment = moment().set({ year, month });
    this.month = Number(this.moment.format('MM'));
    this.year = Number(this.moment.format('YYYY'));

    this.daysInMonth = this.moment.endOf('month').format('DD');

    this.dayOfWeekOfFirstDay = this.moment.startOf('month').format('d');
    this.dayOfWeekOfLastDay = this.moment.endOf('month').format('d');

    this.monthArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  }

  getElements() {
    this.element = '<tr>';

    this.getFirstWeek();
    this.getDays();
    this.getLastWeek();

    this.title = `${this.monthArray[this.month - 1]} ${this.year}`;

    return this.element;
  }

  getFirstWeek() {
    if (this.dayOfWeekOfFirstDay === '0') {
      for (let i = 0; i < 6; i += 1) this.element += '<td>';
    } else {
      for (let i = 1; i < this.dayOfWeekOfFirstDay; i += 1) this.element += '<td>';
    }
  }

  getDays() {
    for (let i = 1; i <= this.daysInMonth; i += 1) {
      const date = this.moment.set({ D: i }).format('DD.MM.YYYY');

      this.element += `<td class="day" data-date="${date}">${i}`;

      if (this.moment.set({ D: i }).format('d') === '0') {
        this.element += '<tr>';
      }
    }
  }

  getLastWeek() {
    for (let i = this.dayOfWeekOfLastDay; i < 7; i += 1) this.element += '<td>&nbsp;';
  }
}
