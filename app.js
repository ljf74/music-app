const music = new Audio('audio/3.mp3');

// Fuck you kds_coder, you are the worst coder I haved seen =-.
// create array
// Due to bootstrap script cant load in my country so I banned songs array, write one by one song on my own :-/

const songs = [
  {
    id: '1',
    songName: '赤岭<br><div>歌手</div>',
    poster: 'img/1.jpg'
  },
  {
    id: '2',
    songName: '静悄悄<br><div>陈泫孝</div>',
    poster: 'img/2.jpg'
  },
  {
    id: '3',
    songName: 'Party<br><div>少女时代</div>',
    poster: 'img/3.jpg'
  },
  {
    id: '4',
    songName: '目及皆是你<br><div>小蓝背心</div>',
    poster: 'img/4.jpg'
  },
  {
    id: '5',
    songName: '超级风格<br><div>SpeXial</div>',
    poster: 'img/5.jpg'
  },
  {
    id: '6',
    songName: 'Ringa Linga<br><div>太阳</div>',
    poster: 'img/6.jpg'
  },
];

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
});

const musicPlayer = () => {
  Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
  });
}

const musicPlayergrounds = () => {
  Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
       element.style.background = '#111727';
  });
}

let index = 3;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
      index = e.target.id;
      musicPlayer();
      e.target.classList.remove('bi-play-circle-fill');
      e.target.classList.add('bi-pause-circle-fill');
      music.src = `audio/${index}.mp3`;
      poster_master_play.src = `img/${index}.jpg`
      music.play();
      title.innerHTML = songs[index-1]['songName'];
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');
      wave.classList.add('active2');
      musicPlayergrounds();
      let curr = `s${index}`;
      let nowPlay = document.getElementById(curr);
      nowPlay.style.background = 'rgb(105, 105, 170, .1)';      
  });
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
   let music_curr = music.currentTime;
   let music_dur = music.duration;

   let min = Math.floor(music_dur / 60);
   let sec = Math.floor(music_dur % 60);
   if (sec < 10) {
     sec = `0${sec}`;
   }
   currentEnd.innerText = `${min}:${sec}`;

   let min1 = Math.floor(music_curr / 60);
   let sec1 = Math.floor(music_curr % 60);
   if (sec1 < 10) {
     sec1 = `0${sec1}`;
   }
   currentStart.innerText = `${min1}:${sec1}`;

  let progressbar = parseInt((music.currentTime/music.duration)*100);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
  music.currentTime = seek.value *  music.duration / 100;
})

music.addEventListener('ended', () => {
  masterPlay.classList.add('bi-play-fill');
  masterPlay.classList.remove('bi-pause-fill');
  wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
  if (vol.value == 0) {
    vol_icon.classList.remove('bi-volume-down-fill');
    vol_icon.classList.add('bi-volume-mute-fill');
    vol_icon.classList.remove('bi-volume-up-fill');
  }

  if (vol.value > 0) {
    vol_icon.classList.add('bi-volume-down-fill');
    vol_icon.classList.remove('bi-volume-mute-fill');
    vol_icon.classList.remove('bi-volume-up-fill');
  }

  if (vol.value > 50) {
    vol_icon.classList.remove('bi-volume-down-fill');
    vol_icon.classList.remove('bi-volume-mute-fill');
    vol_icon.classList.add('bi-volume-up-fill');
  }

  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
  index -= 1;
  if (index < 1) {
  index = 6;
  }
  music.src = `audio/${index}.mp3`;
  poster_master_play.src = `img/${index}.jpg`;
  musicPlayer();
  let curr1 = document.getElementsByClassName('playlistPlay')[index-1];
  curr1.classList.remove('bi-play-circle-fill');
  curr1.classList.add('bi-pause-circle-fill');
  music.play();
  title.innerHTML = songs[index-1]['songName'];
  masterPlay.classList.add('bi-pause-fill');
  masterPlay.classList.remove('bi-play-fill');
  wave.classList.add('active2');
  musicPlayergrounds();
  let curr = `s${index}`;
  let nowPlay = document.getElementById(curr);
  nowPlay.style.background = 'rgb(105, 105, 170, .1)';
})

next.addEventListener('click', () => {
  index -= 0;
  index += 1;
  if (index > 6) {
    index = 1;
  }
  music.src = `audio/${index}.mp3`;
  poster_master_play.src = `img/${index}.jpg`;
  musicPlayer();
  let curr1 = document.getElementsByClassName('playlistPlay')[index-1];
  curr1.classList.remove('bi-play-circle-fill');
  curr1.classList.add('bi-pause-circle-fill');
  music.play();
  title.innerHTML = songs[index-1]['songName'];
  masterPlay.classList.add('bi-pause-fill');
  masterPlay.classList.remove('bi-play-fill');
  wave.classList.add('active2');
  musicPlayergrounds();
  let curr = `s${index}`;
  let nowPlay = document.getElementById(curr);
  nowPlay.style.background = 'rgb(105, 105, 170, .1)';
})

// Dut to style -webkut-scrollbar cant slide up, so if you solve the problem, the below code may help you =-/
let left_scroll =  document.getElementById('left_scroll');
let right_scroll =  document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () => {
  pop_song.scrollLeft -= 330;
})

right_scroll.addEventListener('click', () => {
  pop_song.scrollLeft += 330;
})

let left_scroll1 =  document.getElementById('left_scroll1');
let right_scroll1 =  document.getElementById('right_scroll1');
let item = document.getElementsByClassName('item')[0];

left_scroll1.addEventListener('click', () => {
  item.scrollLeft -= 330;
})

right_scroll1.addEventListener('click', () => {
  item.scrollLeft += 330;
})