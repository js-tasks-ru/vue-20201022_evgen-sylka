export const CounterButton = {
  template: '<button type="button" @click="incrementCount">{{ count }}</button>',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  model: {
    prop: 'count',
    event: 'increment'
  },
  methods: {
    incrementCount() {
      this.$emit(this.$options.model.event, this.count + 1);
    }
  }
};
