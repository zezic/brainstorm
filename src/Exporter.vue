<template>
  <div class="exporter">
    <dropdown
      :items='formatOptions'
      @select='handleFormatSelect'
    ><span>Download</span></dropdown>
  </div>
</template>

<script>
import * as docx from 'docx'
import { saveAs } from 'file-saver'
import Dropdown from './Dropdown'

const formats = {
  DOCX: 1,
  TXT: 2
}

// topic name
// the main typing section
// The type of timer and its length that was chosen for the task
// the date and time the task was created.

const generateDOCX = ({ title, text, timerType, timerLength, startedAt }) => {
  const doc = new docx.Document()
  doc.addParagraph(new docx.Paragraph(`Topic name: ${title}`))
  doc.addParagraph(new docx.Paragraph(`Datetime: ${startedAt}`))
  doc.addParagraph(new docx.Paragraph(`Timer type: ${timerType}`))
  doc.addParagraph(new docx.Paragraph(`Timer length: ${timerLength}`))
  doc.addParagraph(new docx.Paragraph(''))
  text.split('\n').map(chunk => {
    doc.addParagraph(new docx.Paragraph(chunk))
  })

  var packer = new docx.Packer()
  packer.toBlob(doc).then(blob => {
    saveAs(blob, "Brainstorm.docx")
  })
}

const generateTXT = ({ title, text, timerType, timerLength, startedAt }) => {
  let doc = ''
  doc += `Topic name: ${title}\n`
  doc += `Datetime: ${startedAt}\n`
  doc += `Timer type: ${timerType}\n`
  doc += `Timer length: ${timerLength}\n`
  doc += '\n'
  doc += text
  const blob = new Blob([doc], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, "Brainstorm.txt");
}

export default {
  components: {
    Dropdown
  },
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    timerType: {
      type: String,
      required: true
    },
    timerLength: {
      type: String,
      required: true
    },
    startedAt: {
      type: String,
      required: true
    }
  },
  data: () => ({
    formatOptions: [
      { title: 'DOCX', value: formats.DOCX },
      { title: 'TXT', value: formats.TXT }
    ]
  }),
  methods: {
    handleFormatSelect (format) {
      if (format.value === formats.DOCX) { generateDOCX(this) }
      if (format.value === formats.TXT) { generateTXT(this) }
    }
  }
}
</script>

<style lang="css" scoped>
.exporter span {
  font-weight: 600;
  font-size: 18px;
  margin: 0 15px;
}
</style>
