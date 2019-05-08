<template>
  <div class='brainstorm-app'>
    <toolbar>
      <start-button slot='left' @click.native='toggleState'>
        {{ state === states.IDLE ? 'Start' : 'Reset' }}
      </start-button>
      <template slot='middle'>
        <mode-box
          v-if='state === states.IDLE || !wordCountMode'
          title="Clock Timer"
          :display='clockTimerDisplay'
          :active='!wordCountMode && state !== states.FINISHED'
        >
          <dropdown
            v-if='state === states.IDLE'
            slot='left'
            :items='clockTimerOptions'
            :value='clockTimerOption'
            @select='handleClockTimerOptionSelect'
          >
            <arrow class='icon'></arrow>
          </dropdown>
          <clock slot='right' class='icon'></clock>
        </mode-box>
        <toggle-switch v-if='state === states.IDLE' v-model='wordCountMode' class='switch'></toggle-switch>
        <mode-box
          v-if='state === states.IDLE || wordCountMode'
          title="Word Count"
          :display='wordCountDisplay'
          :active='wordCountMode && state !== states.FINISHED'
        >
          <words slot='left' class='icon'></words>
          <dropdown
            v-if='state === states.IDLE'
            slot='right'
            :items='wordCountOptions'
            :value='wordCountOption'
            @select='handleWordCountOptionSelect'
          >
            <arrow class='icon'></arrow>
          </dropdown>
        </mode-box>
      </template>
      <template slot='right'>
        <template v-if='state === states.IDLE'>
          <div class="font-icon">Aa</div>
          <dropdown :value='font' :items='fontOptions' @select='handleFontSelect'>
            <arrow class='icon'></arrow>
          </dropdown>
        </template>
      </template>
      <exporter
        slot='right'
        v-if='state !== states.IDLE'
        :title='title'
        :text='text'
        :timerType='wordCountMode ? "Word Count" : "Clock Timer"'
        :timerLength='wordCountMode ? `${wordCountOption.value} words` : formatSeconds(clockTimerOption.value)'
        :startedAt='String(startedAt)'
      ></exporter>
    </toolbar>
    <title-input :font='font.value' v-model='title'></title-input>
    <text-input :font='font.value' v-model='text' :lock='state !== states.TYPING'></text-input>
  </div>
</template>

<script>
import Toolbar from './Toolbar'
import TitleInput from './TitleInput'
import TextInput from './TextInput'
import StartButton from './StartButton'
import ToggleSwitch from './ToggleSwitch'
import Dropdown from './Dropdown'
import ModeBox from './ModeBox'
import Exporter from './Exporter'
import Arrow from './assets/arrow.svg'
import Clock from './assets/clock.svg'
import Words from './assets/words.svg'

const fontOptions = [
  { title: 'Montserrat', value: 'Montserrat' },
  { title: 'Sans-Serif', value: 'sans-serif' },
  { title: 'Serif', value: 'serif' },
  { title: 'Monospace', value: 'monospace' }
]
const clockTimerOptions = [
  { title: '5 minutes', value: 300 },
  { title: '10 minutes', value: 600 },
  { title: '15 minutes', value: 900 },
  { title: '20 minutes', value: 1200 },
  { title: '30 minutes', value: 1800 }
]
const wordCountOptions = [
  { title: '200 words', value: 200 },
  { title: '300 words', value: 300 },
  { title: '400 words', value: 400 },
  { title: '500 words', value: 500 }
]
const states = {
  IDLE: 1,
  TYPING: 2,
  FINISHED: 3
}
const formatSeconds = seconds => {
  return `${parseInt(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}
const countWords = str => {
  const words = str.match(/\S+/g)
  return words ? words.filter(word => !word.match(/^[.,-]+$/g)).length : 0
}

export default {
  components: {
    Toolbar,
    TitleInput,
    TextInput,
    StartButton,
    ToggleSwitch,
    Dropdown,
    ModeBox,
    Exporter,
    Arrow,
    Clock,
    Words
  },
  data: () => ({
    wordCountMode: true,
    wordCountOptions,
    wordCountOption: wordCountOptions[0],
    clockTimerOptions,
    clockTimerOption: clockTimerOptions[0],
    fontOptions,
    font: fontOptions[0],
    states,
    state: states.IDLE,
    timeLeft: clockTimerOptions[0].value,
    title: '',
    text: '',
    interval: null,
    startedAt: null
  }),
  methods: {
    handleFontSelect (newFont) {
      this.font = newFont
    },
    handleClockTimerOptionSelect (newOption) {
      this.clockTimerOption = newOption
    },
    handleWordCountOptionSelect (newOption) {
      this.wordCountOption = newOption
    },
    countdown () {
      this.timeLeft--
      if (this.timeLeft < 1) {
        clearInterval(this.interval)
        this.state = states.FINISHED
      }
    },
    toggleState () {
      if (this.state === states.IDLE) {
        this.run()
      } else if ([states.TYPING, states.FINISHED].includes(this.state)) {
        this.reset()
      }
    },
    run () {
      this.state = states.TYPING
      this.startedAt = new Date()
      if (!this.wordCountMode) {
        this.interval = setInterval(this.countdown, 1000)
      }
    },
    reset () {
      if (!this.wordCountMode && this.interval) {
        clearInterval(this.interval)
      }
      this.state = states.IDLE
      this.title = ''
      this.text = ''
      this.timeLeft = this.clockTimerOption.value
    },
    formatSeconds
  },
  computed: {
    clockTimerDisplay () {
      if (this.state === states.IDLE) {
        return formatSeconds(this.clockTimerOption.value)
      }
      return formatSeconds(this.timeLeft)
    },
    wordCountDisplay () {
      if (this.state === states.IDLE) {
        return `${this.wordCountOption.value}`
      }
      return `${countWords(this.text)}/${this.wordCountOption.value}`
    }
  },
  watch: {
    text (newText) {
      if (!this.wordCountMode) { return }
      if (this.state !== states.TYPING) { return }
      const count = countWords(newText)
      if (count > this.wordCountOption.value) {
        this.text = newText.slice(0, newText.length - 1)
        this.state = states.FINISHED
      }
    }
  }
}
</script>

<style>
.brainstorm-app,
.brainstorm-app * {
  box-sizing: border-box !important;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&subset=cyrillic');

.brainstorm-app {
  --brainstorm-bg: #ffffff;
  --brainstorm-fg: #000000;
  --brainstorm-accent-bg: #7dd874;
  --brainstorm-accent-fg: #11310e;
  --brainstorm-accent-fg-2: #ffffff;
  font-family: 'Montserrat', sans-serif;
  background-color: var(--brainstorm-bg);
  border-radius: 10px;
  box-shadow: 0 10px 20px 0 rgba(62, 85, 105, .15);
}
.brainstorm-app .icon {
  transform: translateX(0);
  margin: 10px;
  display: block;
}
.brainstorm-app .switch {
  margin: 0 20px;
}
.brainstorm-app .font-icon {
  font-weight: 600;
  font-size: 18px;
}
</style>
