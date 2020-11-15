export const MeetupCover = {
  template: `<div class="meetup-cover" :style="styleObject">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
  props: {
    /**
     * Image link for meetup header
     */
    link: {
      type: String,
      default: '',
    },
    /**
     * Meetup title
     */
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    styleObject() {
      return {
        'background-image': this.link ? `url(${this.link})` : null,
      };
    },
  },
};
