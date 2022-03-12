'use strict';

const APP = {
	init: () => {
		
		setup();
	},
};

const player = document.querySelector('.audioplayer');
const playerSource = document.querySelector('.audioplayer source');
const play = document.querySelector('.playbtn');
const pause = document.querySelector('.pausebtn');
const stop = document.querySelector('.stopbtn');
const next = document.querySelector('.nextbtn');
const prev = document.querySelector('.prevbtn');
const thumb = document.querySelector('.thumbnail img');
const progressBar = document.querySelector('#progressbar');
const skipButtons = document.querySelectorAll('[data-skip]');
let playlist = document.querySelectorAll('[audio-src]');

const playListContainer = document.querySelector('.playlist');

function setup() {
	allMusic.map((song) => {
		let musicDiv = document.createElement('div');
		musicDiv.setAttribute('audio-src', song.src);
		musicDiv.classList.add('playlist-item');
		musicDiv.innerHTML = `
        <div class="thumb">
            <img src=${song.img} alt="" audio-src=${song.src}>
        </div>
        <div class="info">
            <h3 audio-src="${song.src}">${song.name}</h3>
            <p audio-src="${song.src}">${song.artist}</p>
        </div>
   
        `;

		playListContainer.append(musicDiv);
	});
}
//1.1 when user clicks on any item playlist item
$('.playlist').on('click', 'div.playlist-item', function (e) {
	playlist = document.querySelectorAll('[audio-src]');
	console.log(e.target);
	playerSource.src = e.currentTarget.getAttribute('audio-src');
	//remove active state from previous playlist item and add to current item
	playlist.forEach((n) => n.classList.remove('active'));
	e.currentTarget.classList.add('active');
	//load player audio again
	player.load();
	//play audio
	player.play();
	//change audio thumbnail
	thumb.src = e.currentTarget.querySelector('img').getAttribute('src');
});


//1.2 when user click on next btn
next.addEventListener('click', function () {
	playlist.forEach((e, i) => {
		//first check current running audio then again all steps same as above 1.1
		if (e.classList.contains('active')) {
			let d = i + 1;
			if (i === playlist.length - 1) {
				d = 0;
			}
			playerSource.src = playlist[d].getAttribute('audio-src');
			e.classList.remove('active');
			playlist[d].classList.add('active');
			player.load();
			player.play();
			thumb.src = playlist[d].querySelector('img').getAttribute('src');
			throw BreakException;
		}
	});
});

//1.3 when user click on previous button same as above 1.2
prev.addEventListener('click', function () {
	playlist.forEach((e, i) => {
		if (e.classList.contains('active')) {
			let d = i - 1;
			if (i === 0) {
				d = playlist.length - 1;
			}
			playerSource.src = playlist[d].getAttribute('audio-src');
			e.classList.remove('active');
			playlist[d].classList.add('active');
			player.load();
			player.play();
			thumb.src = playlist[d].querySelector('img').getAttribute('src');
			throw BreakException;
		}
	});
});

play.addEventListener('click', function () {
	player.play();
});

pause.addEventListener('click', function () {
	player.pause();
});

stop.addEventListener('click', function () {
	player.pause();
	if (player.currentTime) player.currentTime = 0;
});

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

skipButtons.forEach((button) => button.addEventListener('click', skip));

player.addEventListener('timeupdate', function () {
	function formatTime(seconds) {
		var minutes = Math.floor(seconds / 60);
		minutes = minutes >= 10 ? minutes : minutes;
		var hours = Math.floor(minutes / 60);
		hours = minutes >= 10 ? hours : hours;
		var seconds = Math.floor(seconds % 60);
		seconds = seconds >= 10 ? seconds : seconds;
		//return hours + ":" + minutes + ":" + seconds;
		return minutes + ':' + seconds;
	}
	var seconds = player.currentTime;
	currentTime.innerHTML = formatTime(seconds);
});

player.addEventListener('loadeddata', function () {
	function formatTime(seconds) {
		var minutes = Math.floor(seconds / 60);
		minutes = minutes >= 10 ? minutes : minutes;
		var seconds = Math.floor(seconds % 60);
		seconds = seconds >= 10 ? seconds : seconds;
		return minutes + ':' + seconds;
	}
	var seconds = player.duration;
	durationTime.innerHTML = formatTime(seconds);
});

document.addEventListener('DOMContentLoaded', APP.init);
