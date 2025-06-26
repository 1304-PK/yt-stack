// Handles various YouTube URL formats
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

videos = []

class addVideo {
    constructor(code) {
        this.code = code
        this.url = `https://www.youtube.com/embed/${code}?autoplay=0&mute=0`
        this.iframe = null
    }

    getEmbedUrl({autoplay=false, mute=false, loop=false} = {}){
        const params = new URLSearchParams();
        if (autoplay) {params.set("autoplay", "1")}
        if (mute) {params.set("mute", "1")}
        if (loop) {
            params.set("loop", "1")
            params.set("playlist", this.code)
        }
        return `https://www.youtube.com/embed/${this.code}?${params.toString()}`
    }
}

const addBtn = document.getElementById('add-button')
const playAllBtn = document.getElementById('play-button')
const pauseAllBtn = document.getElementById('pause-button')
const invaildUrl = document.getElementById('invalid-url')
const videoSection = document.getElementById('video-section')
const urlInput = document.getElementById('url-input')

function renderVideos() {
    
    videoSection.innerHTML = ''

    videos.forEach((item, index) => {
        const videoDiv = document.createElement('div')
        videoDiv.className = 'video-frame'

        const iframe = document.createElement('iframe')
        iframe.src = item.url
        iframe.setAttribute("allow", "autoplay")
        iframe.allowFullscreen = true
        item.iframe = iframe

        const removeBtn = document.createElement('button')
        removeBtn.className = 'remove-button'
        removeBtn.innerHTML = 'Remove <i class="fa-solid fa-trash"></i>'

        removeBtn.addEventListener('click', () => {
            videos.splice(index, 1)
            renderVideos()
        })

        videoDiv.append(iframe, removeBtn)
        videoSection.append(videoDiv)
    })
}

addBtn.addEventListener('click', () => {
    const input_code = extractVideoId(urlInput.value.trim())
    if (input_code) {
        const video = new addVideo(input_code)
        videos.push(video)
        renderVideos()
    }
    else {
        alert('Enter a valid URL')
    }
    urlInput.value = ''
})

playAllBtn.addEventListener('click', () => {

    videos.forEach((item) => {
        const newUrl = item.getEmbedUrl({autoplay:true, mute:false, loop:true})
        item.url = newUrl
        item.iframe.src = newUrl
    })
})

pauseAllBtn.addEventListener('click', () => {
    videos.forEach(item => {
        const newUrl = item.getEmbedUrl({})
        item.url = newUrl
        item.iframe.src = newUrl
    })
    renderVideos()
})