'use strict'

const player = document.querySelector('.audioplayer')
const playerSource = document.querySelector('.audioplayer source')
const play = document.querySelector('.playbtn')
const pause = document.querySelector('.pausebtn')
const stop = document.querySelector('.stopbtn');
const next = document.querySelector('.nextbtn');
const prev = document.querySelector('.prevbtn');
const thumb = document.querySelector('.thumbnail img')
const progressBar = document.querySelector('#progressbar')
const skipButtons = document.querySelectorAll('[data-skip]');
const playlist = document.querySelectorAll('[audio-src]');

playlist.forEach(e => {
    e.addEventListener('click', () => {
          playerSource.src = e.getAttribute('audio-src')
          playlist.forEach(n => n.classList.remove('active'))
          e.classList.add('active')
          player.load();
          player.play();
          thumb.src = e.querySelector('img').getAttribute('src')
    })
})

next.addEventListener('click', function(){
     playlist.forEach((e,i) => {
          if(e.classList.contains('active')){
               let d = i + 1;
               if(i  === playlist.length - 1){
                    d = 0
            }
               playerSource.src = playlist[d].getAttribute('audio-src')
               e.classList.remove('active')
               playlist[d].classList.add('active')
               player.load();
               player.play();
               thumb.src = playlist[d].querySelector('img').getAttribute('src') 
               throw BreakException;
        }
    })
})

prev.addEventListener('click', function(){
     playlist.forEach((e,i) => {
          if(e.classList.contains('active')){
               let d = i - 1;
               if(i  === 0){
                    d = playlist.length - 1
            }
               playerSource.src = playlist[d].getAttribute('audio-src')
               e.classList.remove('active')
               playlist[d].classList.add('active')
               player.load();
               player.play();
               thumb.src = playlist[d].querySelector('img').getAttribute('src') 
               throw BreakException;
        }
    })
})

play.addEventListener('click', function(){
    player.play();
})

pause.addEventListener('click', function(){
    player.pause();
})

stop.addEventListener('click', function(){
    player.pause();
  	if (player.currentTime) player.currentTime = 0;
})

player.addEventListener('timeupdate', updateProgressBar, false);

function updateProgressBar() {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((100 / player.duration) * player.currentTime);
    // Update the progress bar's value
    progressBar.value = percentage;
    // Update the progress bar's text (for browsers that don't support the progress element)
    progressBar.innerHTML = percentage + '% played';
}

function skip(e) {
    player.currentTime += parseInt(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', skip));

player.addEventListener("timeupdate", function() {
    function formatTime(seconds) {
      var minutes = Math.floor(seconds / 60);
      minutes = (minutes >= 10) ? minutes : minutes;
      var hours = Math.floor(minutes / 60);
      hours = (minutes >= 10) ? hours : hours;
      var seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : seconds;
      return hours + ":" + minutes + ":" + seconds;
  }
  var seconds = player.currentTime;
  currentTime.innerHTML = formatTime(seconds);
  });
  
  
  player.addEventListener("loadeddata", function() {
  function formatTime(seconds) {
      var minutes = Math.floor(seconds / 60);
      minutes = (minutes >= 10) ? minutes : minutes;
      var seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : seconds;
      return minutes + ":" + seconds;
  }
  var seconds = player.duration;
  durationTime.innerHTML = formatTime(seconds);
  });
