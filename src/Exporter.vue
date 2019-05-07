<template>
  <div class="exporter">
    <dropdown
      :items='formatOptions'
      @select='handleFormatSelect'
    ><span>Download</span></dropdown>
  </div>
</template>

<script>
import JSZip from 'jszip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import Dropdown from './Dropdown'
import template from './assets/template.docx'

const formats = {
  DOCX: 1,
  TXT: 2
}

const generateDOCX = ({ title, text, timerType, timerLength, startedAt }) => {
  var zip = new JSZip(template)
  var doc = new Docxtemplater()
  doc.loadZip(zip)
  doc.setData({ title, text, timerType, timerLength, startedAt })

  try {
    doc.render()
  }
  catch (error) {
    throw error
  }

  var blob = doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  })

  saveAs(blob, "Brainstorm.docx")
}

const generateTXT = ({ title, text, timerType, timerLength, startedAt }) => {
  let doc = ''
  doc += `Topic name: ${title}\n`
  doc += `Date: ${startedAt}\n`
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
