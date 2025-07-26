const tracks = [
  {
    name: '52 Bars',
    artist: 'Karan Aujila',
    src: 'audio/52-Bars.mp3',
    duration: '3:55'
  },
  {
    name: "Perfect",
    artist: 'Ed Sheeran',
    src: 'audio/Perfect.mp3',
    duration: '4:23'
  },
  {
     name: 'Saiyaara',
    artist: 'Tanish Bagchi',
    src: 'audio/Saiyaara.mp3',
    duration: '2:35'
  },
  {
    name: 'Superstar',
    artist: 'Sukh-E Muzical Doctorz, Divya Bhatt',
    src: 'audio/Super Star.mp3',
    duration: '3:38'
  },
  {
   name: 'Supreme',
    artist: 'subh',
    src: 'audio/Supreme.mp3',
    duration: '2:52'
  },
  {
    name: 'Tu hi Mera',
    artist: 'Pritam',
    src: 'audio/Tu Hi Mera.mp3',
    duration: '2:42'
  },
  {
   name: 'Waka Waka',
    artist: 'Shakira',
    src: 'audio/Waka .mp3',
    duration: '3:41'
  }
];

const audio = document.getElementById('audio-player');
const playBtn = document.querySelector('.box2 img'); // play icon
const prevBtn = document.querySelector('.fa-backward-step');
const nextBtn = document.querySelector('.fa-forward-step');
const slider = document.getElementById('song-slider');
const volumeSlider = document.getElementById('volume');
const title = document.querySelector('.box1 .title');
const artist = document.querySelector('.box1 .artist');
const playPauseBtn = document.getElementById('playPauseBtn');

let currentTrackIndex = 0;
let isPlaying = false;

// Load a song
function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  title.textContent = track.name;
  artist.textContent = track.artist;
  slider.value = 0;
  playBtn.src = 'images/play icon.png';
  isPlaying = false;
}

// Play/Pause
function togglePlay() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    playBtn.src = 'images/pause icon.png';
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.src = 'images/play icon.png';
  }
}

// Next/Previous
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.src = 'images/pause icon.png';
  isPlaying = true;
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.src = 'images/pause icon.png';
  isPlaying = true;
}


// Update slider
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    slider.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Seek
slider.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (slider.value / 100) * audio.duration;
  }
});

// Volume
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value / 100;
});

// Auto next when song ends
audio.addEventListener('ended', nextTrack);

audio.addEventListener('ended', () => {
  nextTrack();
});


// Hook buttons
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// Track click from table
document.querySelectorAll('.track-list tr.block').forEach((row, idx) => {
  row.addEventListener('click', () => {
    currentTrackIndex = idx;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.src = 'images/pause icon.png';
    isPlaying = true;
  });
});

// Initial load
loadTrack(currentTrackIndex);
