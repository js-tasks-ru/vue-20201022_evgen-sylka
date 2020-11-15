export const MeetupInfo = {
  template: `<ul class="info-list">
      <li v-if="organizer">
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li v-if="place">
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li v-if="date">
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time datetime="date">{{ formattedDate }}</time>
      </li>
    </ul>`,
  props: {
    /**
     * Meetup organizer info
     */
    organizer: {
      type: String,
      required: true,
    },
    /**
     * Place of meetup
     */
    place: {
      type: String,
      required: true,
    },
    /**
     * Meetup date
     */
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return this.date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
