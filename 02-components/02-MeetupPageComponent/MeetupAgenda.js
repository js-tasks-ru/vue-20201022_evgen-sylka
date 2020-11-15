import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <div
        v-for="item in agenda"
        :key="item.id"
        class="meetup-agenda__item">
        <MeetupAgendaItem :agendaItem="item" />
      </div>
    </div>`,
  components: {
    MeetupAgendaItem,
  },
  props: {
    /**
     * List of event items
     */
    agenda: {
      type: Array,
      required: true,
    },
  },
};
