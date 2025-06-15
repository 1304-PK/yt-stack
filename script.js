// https://youtu.be/lvDEYEPDpQE?si=_Wjco8s6e33uLkzj

function extractVideoId(url) {
    // Handles various YouTube URL formats
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

videos = []

class addVideo {
    constructor(code, url) {
        this.url = url
        this.code = code
    }
}

const addBtn = document.getElementById('add-button')
const playAllBtn = document.getElementById('play-button')
const invaildUrl = document.getElementById('invalid-url')

function renderVideos() {
    const videoSection = document.getElementById('video-section')
    videoSection.innerHTML = ''

    videos.forEach((item, index) => {
        const videoDiv = document.createElement('div')
        videoDiv.className = 'video-frame'
        const iframe = document.createElement('iframe')
        const removeBtn = document.createElement('button')
        removeBtn.className = 'remove-button'
        removeBtn.innerHTML = 'Remove <i class="fa-solid fa-trash"></i>'

        removeBtn.addEventListener('click', () => {
            videos.splice(index, 1)
            renderVideos()
        })

        // iframe.width = "400"
        // iframe.height = "225"
        iframe.src = item.url
        iframe.allowFullscreen = true
        videoDiv.append(iframe, removeBtn)
        videoSection.append(videoDiv)
    })
}

addBtn.addEventListener('click', () => {
    const urlInput = document.getElementById('url-input')
    if (urlInput.value) {
        const code = extractVideoId(urlInput.value)
        const url = `https://www.youtube.com/embed/${code}?autoplay=0&mute=0`
        const video = new addVideo(code, url)
        videos.push(video)

        renderVideos()
        invaildUrl.textContent = ''
    }
    else {
        invaildUrl.textContent = 'Invalid URL'
    }

})

playAllBtn.addEventListener('click', () => {

    videos.forEach((item) => {
        item.url = `https://www.youtube.com/embed/${item.code}?autoplay=1&mute=0&loop=1&playlist=${item.code}`
    })
    renderVideos()
})