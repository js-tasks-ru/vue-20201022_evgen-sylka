export const MeetupDescription = {
  template: `<p class="meetup-description">{{ description }}</p>`,
  props: {
    /**
     * Meetup description
     */
    description: {
      type: String,
      default: '',
    },
  },
};
