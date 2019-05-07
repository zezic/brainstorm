export default {
  props: {
    value: {
      type: String,
      required: true
    },
    font: {
      type: String,
      default: 'Montserrat'
    }
  },
  computed: {
    localValue: {
      set (newValue) {
        this.$emit('input', newValue)
      },
      get () {
        return this.value
      }
    }
  }
}
