import { TALK_TYPE, agendaItemTitles, agendaItemIcons } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',
  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="'/assets/icons/icon-' + icon + '.svg'" />
      </div>
      <div class="meetup-agenda__item-col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ title }}</h5>
        <p v-if="isShowSpeaker">
          <span>{{ agendaItem.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,
  props: {
    /**
     * Event info { startsAt, endsAt, title, speaker, language, description, type }
     */
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isShowSpeaker() {
      return TALK_TYPE === this.agendaItem.type;
    },
    title() {
      return this.getTitleByType(this.agendaItem.title, this.agendaItem.type);
    },
    icon() {
      return this.getIconByType(this.agendaItem.type);
    },
  },
  methods: {
    getTitleByType(title, type) {
      return title || agendaItemTitles[type] || agendaItemTitles.other;
    },
    getIconByType(type) {
      return agendaItemIcons[type] || agendaItemIcons.other;
    },
  },
};
