const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");

const currentTimeEl = document.getElementById("current-time");
const durationTimeEl = document.getElementById("duration");

const progressHeader = document.getElementById("progress-header");
const progress = document.getElementById("progress");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
    {
        name: "hoodie",
        displayname: "No Interuption",
        artist: "Hoodie Allen"
    },
    {
        name: "litva",
        displayname: "litva",
        artist: "Eurovision"
    },

    {
        name: "bruno_mars",
        displayname: "Just the way are you",
        artist: "Bruno Mars"
    },
    {
        name: "sting",
        displayname: "Englishman In York",
        artist: "Sting"
    },
    {
        name: "susa",
        displayname: "Susa",
        artist: "Tunzale"
    },
]


let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");

    music.play();

}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");

    music.pause();

}

// arrow function  && ternary operator
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));


function loadSong(songname) {
    title.textContent = songname.displayname;
    artist.textContent = songname.artist;
    music.src = `music/${songname.name}.mp3`
}

let songIndex = 0;

function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);








function progressPlayer(e) {
    if (isPlaying) {

        const { duration, currentTime } = e.srcElement;

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;


        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        if (durationSeconds) {
            durationTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }


        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function progressContainerBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    const { duration } = music;
    music.currentTime=(clickX / width) * duration;
}

music.addEventListener("timeupdate", progressPlayer);
progressHeader.addEventListener("click", progressContainerBar);