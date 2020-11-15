import { MEETUP_ID, fetchMeetup } from './data.js';
import { MeetupView } from './MeetupView.js';

export const MeetupPage = {
  name: 'MeetupPage',
  template: `<MeetupView v-if="meetup" :meetup="meetup" />`,
  components: {
    MeetupView,
  },
  data: {
    meetup: null,
  },
  mounted() {
    this.getMeetupInfo();
  },
  methods: {
    async getMeetupInfo() {
      await fetchMeetup(MEETUP_ID).then((data) => {
        this.meetup = data;
      });
    },
  },
};
