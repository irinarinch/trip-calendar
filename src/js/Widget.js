export default class Widget {
  constructor(calendarCtrl) {
    this.calendarCtrl = calendarCtrl;

    this.calendar = document.querySelector('.calendar');
    this.checkbox = document.querySelector('.checkbox');

    this.thereInput = document.querySelector('.there-input');
    this.backInput = document.querySelector('.back-input');

    this.checkbox.addEventListener('click', this.controlBlockBack.bind(this));
  }

  init() {
    this.calendarCtrl.init();

    this.selectThere = this.selectThere.bind(this);
    this.selectBack = this.selectBack.bind(this);

    this.focus(this.thereInput);
  }

  focus(input) {
    input.focus();

    if (input === this.thereInput) {
      this.calendar.removeEventListener('click', this.selectBack);
      this.calendar.addEventListener('click', this.selectThere);

      this.calendarCtrl.changeCursor('pointer');
    } else {
      this.calendar.removeEventListener('click', this.selectThere);
      this.calendar.addEventListener('click', this.selectBack);

      this.calendarCtrl.changeCursor();
    }
  }

  controlBlockBack() {
    this.backBlock = document.querySelector('.back');
    this.showBackBlock();

    if (this.calendarCtrl.selected.there) {
      this.focus(this.backInput);
    }

    if (!this.checkbox.checked) {
      this.focus(this.thereInput);
      this.hideBackBlock();

      this.calendarCtrl.render();
    }
  }

  showBackBlock() {
    this.backBlock.classList.remove('hidden');
    this.calendar.style.margin = '10px auto';
  }

  hideBackBlock() {
    this.backBlock.classList.add('hidden');

    this.calendarCtrl.selected.back = null;
    this.backInput.value = '';

    this.calendar.style.margin = '10px';
  }

  selectThere(e) {
    if (e.target.closest('.outdated')) return;
    if (!e.target.closest('.day')) return;

    const check = this.checkDateSelection(e.target.dataset.date, this.calendarCtrl.selected.back);

    if (!check) {
      this.calendarCtrl.selected.back = null;
      this.backInput.value = this.calendarCtrl.selected.back;
    }

    this.backInput.onfocus = () => {
      this.focus(this.backInput);
    };

    this.calendarCtrl.selected.there = e.target.dataset.date;
    this.thereInput.value = this.calendarCtrl.selected.there;

    this.calendarCtrl.render();
  }

  selectBack(e) {
    if (e.target.closest('.outdated')) return;
    if (!e.target.closest('.day')) return;

    const check = this.checkDateSelection(this.calendarCtrl.selected.there, e.target.dataset.date);

    if (!check) return;

    this.thereInput.onfocus = () => {
      this.calendarCtrl.changeCursor('pointer');
      this.focus(this.thereInput);
    };

    this.calendarCtrl.selected.back = e.target.dataset.date;
    this.backInput.value = this.calendarCtrl.selected.back;

    this.calendarCtrl.render();
    this.calendarCtrl.changeCursor();
  }

  checkDateSelection(date, secondDate) {
    const there = this.calendarCtrl.getMoment(date);
    const back = this.calendarCtrl.getMoment(secondDate);

    if (there < back) {
      return true;
    }
    return false;
  }
}
