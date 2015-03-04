var mytrack=document.getElementById('mytrack');
var playButton=document.getElementById('playButton');
var muteButton=document.getElementById('muteButton');
var currentTime=document.getElementById('currentTime');
var processBar=document.getElementById("processBar");
var defaultBar=document.getElementById("defaultBar");

if (playButton) {
	playButton.addEventListener('click',PlayOrPause,false);
};

if (muteButton) {
	muteButton.addEventListener('click',MuteOrUnmute,false);
};
if (mytrack) {
	mytrack.addEventListener('loadedmetadata', LoadAudioFile,false);
};

if (defaultBar) {
	defaultBar.addEventListener('click',RepositionProcessBar,false);
};

function PlayOrPause() {
	if (!mytrack.paused && !mytrack.ended) {
		mytrack.pause();
		SoundEndLogic();
	}
	else{
		mytrack.play();
		SetButtonImage(playButton,"img/pause.png");
		update=setInterval(UpdateCurrentEnviroment,500);
	}
};

function MuteOrUnmute() {
	if (mytrack.muted==true) {
		mytrack.muted=false;
		SetButtonImage(muteButton,"img/mute.png");
	}
	else{
		mytrack.muted=true;
		SetButtonImage(muteButton,"img/unmute.png");
	};
}

function LoadAudioFile () {
	var duration=document.getElementById('fullTime');
	var durMinute=parseInt(mytrack.duration/60);
	var durSecond=parseInt(mytrack.duration%60);
	duration.innerHTML=durMinute+" : "+durSecond;
}

function RepositionProcessBar (e) {
	var relativePosition=e.pageX-defaultBar.offsetLeft;
	SetWidth(processBar,relativePosition);
	SetAudioCurrentStatus(relativePosition);
	console.info(relativePosition);
}


function UpdateCurrentEnviroment () {
	UpdateCurrentTime();
	UpdateCurrentProcessBar();
	CheckPlayEndStatus();
}

function UpdateCurrentTime () {
	var curMinute=parseInt(mytrack.currentTime/60);
	var curSecond=parseInt(mytrack.currentTime%60);
	var formatSecond=(curSecond>10)?curSecond:("0"+curSecond);
	SetCurrentTime(curMinute+" : "+formatSecond);
}

function UpdateCurrentProcessBar () {
	var currentSize=parseInt(mytrack.currentTime*640/mytrack.duration);
	SetWidth(processBar,currentSize);
}

function CheckPlayEndStatus () {
	if (mytrack.ended) {
		SoundEndLogic();
		SetWidth(processBar,0);
		SetCurrentTime("0:00");
	};
}

function SetWidth ( o, widthValue) {
	o.style.width=widthValue+'px';
}

function SetCurrentTime (value) {
	console.info(value);
	currentTime.innerHTML=value;
}

function SetButtonImage (o,path) {
	o.style.backgroundImage="url("+path+")";
}

function SoundEndLogic () {
	SetButtonImage(playButton,"img/play.png");
	window.clearInterval(update);
}

function SetAudioCurrentStatus (position) {
	var time=position*mytrack.duration/640;
	mytrack.currentTime=time;
}

