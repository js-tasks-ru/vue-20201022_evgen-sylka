function getLastDayOfMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return new Date(year, month, 0).getDate();
}

function getDayOfWeek(date, days) {
  const firstDayOfMonth = new Date(date).setDate(days);
  return new Date(firstDayOfMonth).getDay();
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button
            class="rangepicker__selector-control-left"
            @click="updateMonth(-1)"></button>
          <div>{{ title }}</div>
          <button
            class="rangepicker__selector-control-right"
            @click="updateMonth(1)"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          v-for="(item, dayIndex) in rows"
          :key="dayIndex"
          :class="['rangepicker__cell', item.isActive ? '' : 'rangepicker__cell_inactive']">
          {{ item.day }}
          <a v-for="(item, meetupIndex) in item.meetups"
             :key="meetupIndex"
             class="rangepicker__event">
            {{ item }}
          </a>
        </div>
      </div>
    </div>
  </div>`,
  props: {
    /**
     * List of meetups
     */
    meetups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      date: new Date(new Date().setDate(1)),
    };
  },
  computed: {
    title() {
      return new Date(this.date).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },
    monthDays() {
      return getLastDayOfMonth(this.date);
    },
    previousMonthDays() {
      const currentDate = new Date(this.date);
      const currentMonth = currentDate.getMonth();
      const previousMonth = new Date(currentDate.setMonth(currentMonth - 1));
      return getLastDayOfMonth(previousMonth);
    },
    firstDayOfWeek() {
      return getDayOfWeek(this.date, 1) || 7;
    },
    rowCount() {
      return Math.ceil((this.monthDays + this.firstDayOfWeek - 1) / 7);
    },
    rows() {
      const rows = [];
      let counter = 2 - this.firstDayOfWeek;
      let isNextMonth = false;
      for (let row = 1; row <= this.rowCount * 7; ++row) {
        let isActive = counter >= 1 && !isNextMonth;
        if (this.monthDays < counter) {
          counter = 1;
          isActive = false;
          isNextMonth = true;
        }
        const isNotPrevMonth = counter >= 1;
        const dayNumber = isNotPrevMonth
          ? counter
          : this.previousMonthDays + counter;

        const year = this.date.getFullYear();
        const month =
          this.date.getMonth() + (isNextMonth ? 1 : isNotPrevMonth ? 0 : -1);

        rows.push(this.prepareDayOfRow(year, month, dayNumber, isActive));
        counter++;
      }

      return rows;
    },
  },
  methods: {
    updateMonth(monthQuantity) {
      const currentMonth = this.date.getMonth();
      this.date = new Date(this.date.setMonth(currentMonth + monthQuantity));
    },
    prepareDayOfRow(year, month, day, isActive) {
      const currentDateMs = new Date(
        Date.UTC(year, month, day, 0, 0, 0),
      ).getTime();
      const meetups = this.meetups
        .filter((item) => item.date === currentDateMs)
        .map((item) => item.title);
      return { day, isActive, meetups };
    },
  },
};
