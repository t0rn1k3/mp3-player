const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progressContainer');
const progress = document.getElementById('progress');
const image = document.getElementById('image');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const currentTimeAudio = document.getElementById('currentTime');
const durationAudio = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');


//check if audio is playing
let isPlaying = false;


//play 

function playMusic() {
    isPlaying = true;
    // play.classList.replace('fa-play', 'fa-pause');
    audio.play()
    .then (play.classList.replace('fa-play', 'fa-pause'))
    .catch(error => error); 
    
}

// pause
function pauseMusic() {
    isPlaying = false
    play.classList.replace('fa-pause', 'fa-play');
    audio.pause();  
}


play.addEventListener('click', ()=> {
    isPlaying ? pauseMusic() : playMusic();
});


const songs = [
    {
        name: 'hamats',
        audioName: 'Sea Of Nothingness',
        artist: 'Hamatsuki'
    },
    {
        name: 'The Rime  - SCSI-9',
        audioName: 'The Rime',
        artist: 'SCSI-9'
    },
    {
        name: 'winter chill',
        audioName: 'Winter Chill',
        artist: 'Bedford Falls'
    },
    {
        name: 'dexter',
        audioName: 'Dexter',
        artist: 'Ricardo Villalobos'
    },
    {
        name: 'ricardo',
        audioName: 'Caminando',
        artist: 'Ricardo Villalobos & Reboot'
    },
    {
        name: 'idilia',
        audioName: 'Idilia',
        artist: 'Bajoo'
    },
]


function switchMusic(music) {
    title.textContent = music.audioName;
    artist.textContent = music.artist;
    audio.src = `music/${music.name}.mp3`;
    image.src = `images/${music.name}.jpg`; 
}

// current song 
let songIndex = 0;

switchMusic(songs[songIndex]);

prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);

// // next song 

function nextSong() {
    songIndex++;
    if (songIndex < songIndex - 1) {
        songIndex = 0;
    }
    switchMusic(songs[songIndex]);
    console.log(songIndex);
    playMusic();
}

// //previous song

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;   
    }
    switchMusic(songs[songIndex]);
    console.log(songIndex);
    playMusic();
};


function updateProgress(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement;
        // uodate progress bar
        const progressWidth = (currentTime/duration) * 100;
        progress.style.width = `${progressWidth}%`;
        //calculate duration
        const durationMinute = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
       
        //switching delay duration
        if (durationSeconds) {
            durationAudio.textContent = `${durationMinute}:${durationSeconds}`;
        }

         //calculate current
         const currentMinute = Math.floor(currentTime / 60);
         let currentSeconds = Math.floor(currentTime % 60);
         if (currentSeconds < 10) {
             currentSeconds = `0${currentSeconds}`;
         }
         currentTimeAudio.textContent = `${currentMinute}:${currentSeconds}`
    }
}

audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;   
    const clickX = e.offsetX;
    const {duration} = audio;
    audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);


