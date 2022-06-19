// All Songs Array 
const songs = [{
    property: "295"
}, {
    property: "Bad"
}, {
    property: "East_Side_Flow"
}, {
    property: "Goat"
}, {
    property: "Issa_Jatt"
}, {
    property: "Jail"
}, {
    property: "Just_Listen"
}, {
    property: "Legends"
}, {
    property: "Levels"
}, {
    property: "Outlaw"
}, {
    property: "Self_Made"
}, {
    property: "So_High"
}, {
    property: "The_Last_Ride"
}, {
    property: "Tochan"
}];
// Getting the Audio Element from the DOM
const music = document.getElementById("music");
const image = document.getElementById("image");
const songName = document.getElementById("songName");

const musicCurrentTime = document.getElementById("musicCurrentTime");
const musicDuration = document.getElementById("musicDuration");

const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById('progressContainer');

const songCounter = document.getElementById("songCounter");

// Getting our control buttons
const prevBtn = document.getElementById("prevBtn");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");

// Bollean to check the music is Playing or not 
let isPlaying = false;
let songIndex = 0;

// Load Music 
function load_music() {
    if (localStorage.getItem("songNumber") > 1) {
        songIndex = localStorage.getItem("songNumber");
    }
    songIndex = parseInt(songIndex)
    songCounter.children[0].innerText = songIndex + 1 ;
    songCounter.children[2].innerText = songs.length;
    const name = songs[songIndex].property;
    music.src = `${name}.mp3`;
    image.src = `${name}.webp`;
    image.setAttribute("title", name)
    songName.innerText = name;
}

// Play the music 
function play_music() {
    isPlaying = true;
    music.play();
    playBtn.classList.replace("fa-play", 'fa-pause');
    playBtn.setAttribute("title", 'Pause')
}

// Pause the music

function pause_music() {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace("fa-pause", 'fa-play')
    playBtn.setAttribute("title", 'Play')
}

// Previous Song 
function previous_song() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    };
    localStorage.setItem("songNumber", songIndex);
    load_music();
    play_music();
}

// Next Song
function next_song() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    localStorage.setItem("songNumber", songIndex);
    load_music();
    play_music();
}
// Convert seconds to HH:MM:SS
function convert_seconds_to_mintes(secs) {

    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor(secs % 60);

    minutes < 10 ? minutes = '0' + minutes : '';
    seconds < 10 ? seconds = '0' + seconds : '';

    if (hours > 0) {
        hours < 10 ? hours = '0' + hours : '';
        return `${hours}:${minutes}:${seconds}`;
    }
    else {
        return `${minutes}:${seconds}`;
    }
}

// Update ProgressBar and Times 
function update_progress_and_times(e) {
    const { currentTime, duration } = e.target;

    // Updatint the Time Durations 
    const ct = convert_seconds_to_mintes(currentTime);
    const tt = convert_seconds_to_mintes(duration);

    if (ct !== 'NaN' && tt !== 'NaN:NaN') {
        musicCurrentTime.innerText = ct;
        musicDuration.innerHTML = tt;
    }

    // Updating the progress Bar 
    const widthPercentage = (currentTime / duration) * 100
    progressBar.style.width = `${widthPercentage}%`;
}

// change Duration 

function change_music_time(e) {
    const p = (e.offsetX / this.clientWidth) * 100;
    const fp = (music.duration / 100) * p;
    music.currentTime = fp;
}


// Event Listeners
playBtn.addEventListener("click", () => {
    isPlaying ? pause_music() : play_music();
})

prevBtn.addEventListener("click", previous_song);
nextBtn.addEventListener("click", next_song);

music.addEventListener("ended", next_song);

music.addEventListener("timeupdate", update_progress_and_times);
progressContainer.addEventListener("click", change_music_time);

// onload document calls the load_music function
load_music();