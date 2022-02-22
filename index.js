//get audio player 
const player = document.querySelector('.audioplayer')
//get audio player source
const playerSource = document.querySelector('.audioplayer source')
//get play button
const play = document.querySelector('.playbtn')
//get pause button
const pause = document.querySelector('.pausebtn')
//get stop button
var stop = document.querySelector('.stopbtn');
//get next audio play button
const next = document.querySelector('.nextbtn');
//get prev audio play button
const prev = document.querySelector('.prevbtn');
//get audio player thumbnail image
const thumb = document.querySelector('.thumbnail img')
//get progressbar
const progressBar = document.querySelector('#progressbar')
//get skip buttons
const skipButtons = document.querySelectorAll('[data-skip]');
//get playlist audio src
const playlist = document.querySelectorAll('[audioSrc]');


//1.1 when user click on any playlist item
playlist.forEach(e => {
    e.addEventListener('click', () => {
        //change audio player audio file
        playerSource.src = e.getAttribute('audioSrc')
        //remove active state from previus playlist item and add to current item
        playlist.forEach(n => n.classList.remove('active'))
        e.classList.add('active')
        //again load audio player
        player.load();
        // play audio
        player.play();
        //change audio thumbnail
        thumb.src = e.querySelector('img').getAttribute('src')
    })
})

//1.2 when user click on next btm
next.addEventListener('click', function(){

    playlist.forEach((e,i) => {
        //first check current running audio then again all steps same as above 1.1
        if(e.classList.contains('active')){
            let d = i + 1;
            if(i  === playlist.length - 1){
                d = 0
            }
            playerSource.src = playlist[d].getAttribute('audioSrc')
            e.classList.remove('active')
            playlist[d].classList.add('active')
            player.load();
            player.play();
            thumb.src = playlist[d].querySelector('img').getAttribute('src') 
            throw BreakException;
        }
    })
})

//1.3 when user click on previus button same as above 1.2
prev.addEventListener('click', function(){
    playlist.forEach((e,i) => {
        if(e.classList.contains('active')){
            let d = i - 1;
            if(i  === 0){
                d = playlist.length - 1
            }
            playerSource.src = playlist[d].getAttribute('audioSrc')
            e.classList.remove('active')
            playlist[d].classList.add('active')
            player.load();
            player.play();
            thumb.src = playlist[d].querySelector('img').getAttribute('src') 
            throw BreakException;
        }
    })
})

//1.4 when user click on play button call play function
play.addEventListener('click', function(){
    player.play();
})

//1.5 when user click on pause button call pause function
pause.addEventListener('click', function(){
    player.pause();
})

//1.6 when user click stop audio player first pause audio then set audio time to 0
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

//get skip value from from and change current value
skipButtons.forEach(button => button.addEventListener('click', skip));


//set current time 
player.addEventListener("timeupdate", function() {
    function formatTime(seconds) {
        // Work out how much of the media has played via the duration and currentTime parameters
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
  
  //set total time
  player.addEventListener("loadeddata", function() {
  function formatTime(seconds) {
      // Work out how much of the media has played via the duration and currentTime parameters
      var minutes = Math.floor(seconds / 60);
      minutes = (minutes >= 10) ? minutes : minutes;
      var seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : seconds;
      return minutes + ":" + seconds;
  }
  var seconds = player.duration;
  durationTime.innerHTML = formatTime(seconds);
  });

  