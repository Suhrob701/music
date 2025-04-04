let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/stay.png',
        name : 'Stay',
        artist : 'The Kid LAROI, Justin Bieber',
        music : 'music/2_5330244479523753776.mp3'
    },
    {
        img : 'images/fallingdown.jpg',
        name : 'Falling Down',
        artist : 'Wid Cards',
        music : 'music/12. Falling Down.mp3 '
    },
    {
        img : 'images/faded.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'music/Fadded - Jimmy Banks.m4a'
    },
    {
        img : 'images/ratherbe.jpg',
        name : 'Rather Be',
        artist : 'Clean Bandit',
        music : 'music/Rather It Be September - Clean Bandit vs. Earth, Wind   Fire.m4a'
    },
    {
        img : 'images/1200x630cw.png',
        name : 'Onticka - Where Are You',
        artist : 'Clean Bandit',
        music : 'music/Onticka - Where Are You   @best.music.inst.mp3'
    },
    {
        img : 'images/b86f129434017fce496c355d6e1bd136.jpg',
        name : 'P.A',
        artist : 'Clean Bandit',
        music : 'music/ПолатАлемдар_Афигеннаямузыка_muzmo_su.mp3'
    }
    
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);// vaqt audio bilan tugri kelishi
    reset();  // vaqtini boshqarish uchun
    curr_track.src = music_list[track_index].music;
    curr_track.load();

    const track = music_list[track_index];
    track_art.style.backgroundImage = `url(${track.img})`;
    track_name.textContent = track.name;
    track_artist.textContent = track.artist;
    now_playing.textContent = `Playing music ${track_index + 1} of ${music_list.length}`;


    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate() {
        let color = '#';  // Rangni yaratish uchun bosh harf
        for (let i = 0; i < 6; i++) {
            // Tasodifiy raqam yoki harf tanlash (0-15 oralig'ida)
            color += Math.floor(Math.random() * 16).toString(16);
        }
        return color;
    }
    
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    if (isRandom) {
        pauseRandom();
    } else {
        playRandom();
    }
}

function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    loadTrack(track_index);  // Joriy trekni yuklash
    playTrack();  // Trekningni o'ynatish
}


function playpauseTrack() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (isRandom) {
        track_index = Math.floor(Math.random() * music_list.length);  // Tasodifiy trekni tanlash
    } else {
        track_index = (track_index + 1) % music_list.length;  // Oddiy tartibda keyingi trekka o'tish
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    if (!curr_track.duration) return;


    curr_time.textContent = Math.floor(curr_track.currentTime / 60) + ":" + Math.floor(curr_track.currentTime % 60);
    total_duration.textContent = Math.floor(curr_track.duration / 60) + ":" + Math.floor(curr_track.duration % 60);
}
