import Vue from './vue.esm.browser.js';

new Vue({
  el: '#app',
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    increaseCounter() {
      this.counter++;
    }
  }
});

