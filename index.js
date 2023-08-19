const inputFile = document.querySelector("input[type=file]")
const btnEncryptAndSave = document.querySelector("button#encryptAndSave")
const btnDecryptAndShow = document.querySelector("button#decryptAndShow")
const btnDecryptAndSave = document.querySelector("button#decryptAndSave")
const videoElement = document.querySelector("video")

const mimeCodec = 'video/mp4; codecs="avc1.640020, mp4a.40.2"'
const isTypeSupported = MediaSource.isTypeSupported(mimeCodec)
if (!isTypeSupported) {
  alert(`${mimeCodec} not supported!`)
}

function createStream(arrayBuffer) {
  const mediaSource = new MediaSource()
  videoElement.src = URL.createObjectURL(mediaSource)

  mediaSource.addEventListener("sourceopen", () => {
    const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)
    sourceBuffer.addEventListener("updateend", () => {
      console.log(mediaSource.readyState)
      mediaSource.endOfStream()
      console.log("play")
      videoElement.play()
      // console.log(mediaSource)
    })
    sourceBuffer.appendBuffer(arrayBuffer)
  })

  mediaSource.addEventListener("sourceended", () => {
    console.log("sourceended")
  })
}

const saveBlob = (function () {
  const a = document.createElement("a")
  document.body.appendChild(a)
  a.setAttribute("style", "display: none")

  return function (blob, fileName) {
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }
})()

function encryptAndSave() {
  const file = Array.from(inputFile.files)[0]
  const reader = new FileReader()
  reader.addEventListener("loadend", (ev) => {
    const arrayBuffer = ev.target.result
    const bytes = new Uint8Array(arrayBuffer)
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = bytes[i] ^ 42
    }
    const blob = new Blob([bytes])
    saveBlob(blob, file.name + ".encrypted")
  })
  reader.readAsArrayBuffer(file)
}

function decryptAndShow() {
  const file = Array.from(inputFile.files)[0]
  const reader = new FileReader()
  reader.addEventListener("loadend", (ev) => {
    const arrayBuffer = ev.target.result
    const bytes = new Uint8Array(arrayBuffer)
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = bytes[i] ^ 42
    }
    createStream(bytes)
    // const blob = new Blob([bytes])
    // const url = URL.createObjectURL(blob)
    // document.querySelector("video").src = url
    // alert(url)
  })
  reader.readAsArrayBuffer(file)
}

function decryptAndSave() {
  const file = Array.from(inputFile.files)[0]
  const reader = new FileReader()
  reader.addEventListener("loadend", (ev) => {
    const arrayBuffer = ev.target.result
    const bytes = new Uint8Array(arrayBuffer)
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = bytes[i] ^ 42
    }

    const blob = new Blob([bytes])
    const newName = file.name.replace(".encrypted", "")
    saveBlob(blob, newName)
  })
  reader.readAsArrayBuffer(file)
}

inputFile.addEventListener("change", (event) => {
  const allFiles = Array.from(event.target.files)
  console.log(allFiles[0])
})

btnEncryptAndSave.addEventListener("click", (event) => {
  encryptAndSave()
})

btnDecryptAndShow.addEventListener("click", (event) => {
  decryptAndShow()
})

btnDecryptAndSave.addEventListener("click", (event) => {
  decryptAndSave()
})
