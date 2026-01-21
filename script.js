// script.js

const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progressFill = document.getElementById('progressFill');
const cdDisk = document.getElementById('cdDisk');

let currentSongIndex = 0;
let isPlaying = false;

// ページが読み込まれたときに実行
window.onload = function() {
    // playlist変数は playlist.js で定義されています
    if (typeof playlist !== 'undefined' && playlist.length > 0) {
        audio.src = playlist[0];
        console.log("曲をロードしました:", playlist[0]);
    } else {
        console.log("プレイリストが見つかりません。manager.pyを実行しましたか？");
    }
};

function togglePlay() {
    if (!playlist || playlist.length === 0) {
        alert("曲がありません。musicフォルダに曲を入れてmanager.pyを実行してください。");
        return;
    }

    if (isPlaying) {
        audio.pause();
        playBtn.innerText = "▶";
        cdDisk.classList.remove('playing');
    } else {
        audio.play();
        playBtn.innerText = "❚❚";
        cdDisk.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }
    loadAndPlay(currentSongIndex);
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }
    loadAndPlay(currentSongIndex);
}

function loadAndPlay(index) {
    audio.src = playlist[index];
    if (isPlaying) {
        audio.play();
    }
}

audio.addEventListener('timeupdate', () => {
    if(audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percent + '%';
    }
});

function seek(e) {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    if(audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
    }
}