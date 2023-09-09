import moment from 'moment/moment';
import Widget from './Widget';
import Calendar from './Calendar';
import CalendarController from './CalendarController';

const calendar = new Calendar(moment().format('YYYY'), moment().format('MM') - 1);
const calendarCtrl = new CalendarController(calendar);

const widget = new Widget(calendarCtrl);

widget.init();
