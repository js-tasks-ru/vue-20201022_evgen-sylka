import Vue from './vue.esm.browser.js';

/** URL for API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** Meetup id */
const MEETUP_ID = 6;

/**
 * Return link for meetup image
 * @param meetup - meetup object
 * @return {string} - link for image
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Return link for meetup info
 * @returns {string}
 */
function getMeetupLink() {
  return `${API_URL}/meetups/${MEETUP_ID}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const TALK_TYPE = 'talk';

export const app = new Vue({
  el: '#app',

  data: {
    agenda: [],
    date: null,
    description: '',
    imageUrl: null,
    organizer: '',
    place: '',
    title: ''
  },

  mounted() {
    this.getMeetupInfo();
  },

  computed: {
    formattedDate() {
      return new Date(this.date).toLocaleString(navigator.language,{
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    hasAgenda() {
      return this.agenda?.length;
    }
  },

  methods: {
    async getMeetupInfo() {
        await fetch(getMeetupLink())
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.agenda = data.agenda;
            this.date = data.date;
            this.description = data.description;
            this.imageUrl = getMeetupCoverLink(data);
            this.organizer = data.organizer;
            this.place = data.place;
            this.title = data.title;
        });
    },
    getTitleByType(title, type) {
      return title || agendaItemTitles[type] || agendaItemTitles.other;
    },
    getIconByType(type) {
      return agendaItemIcons[type] || agendaItemIcons.other;
    },
    isShowSpeaker(type) {
      return TALK_TYPE === type;
    },
    getBackgroundImage() {
      return {
        'background-image': this.imageUrl ? `url(${this.imageUrl})` : 'none'
      }
    }
  }
});
