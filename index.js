const secDiv = document.getElementById("sc");
const minDiv = document.getElementById("mn");
const hourDiv = document.getElementById("hr");

setInterval(updateClock, 1000);

function updateClock(){
    let date = new Date();
    let sec = date.getSeconds() / 60;
    let min = (date.getMinutes() + sec) / 60;
    let hour = (date.getHours() + min) / 12;

    secDiv.style.transform = "rotate(" + (sec * 360) + "deg)";
    minDiv.style.transform = "rotate(" + (min * 360) + "deg)";
    hourDiv.style.transform = "rotate(" + (hour * 360) + "deg)";
}

updateClock();

const btnPlus = document.getElementById('img');

btnPlus.addEventListener('click', function(){
  var time = document.getElementById("time");
  time.classList.toggle("active");
})

//Timer
var countDwn = function(){
  timerBtn.addEventListener('click',(e)=>{
      e.preventDefault()
      let countHour = parseInt(timedHour.value); //timedHour, hour value from hour input
      let countMinute = parseInt(timedMinute.value); //timedMinute, minute value from minute input
          countMinute = countMinute + (countHour * 60)
      let countSeconds = countMinute * 60;
      
      // console.log(countMinute)
      setInterval(()=>{

          var minuteLeft = Math.floor(countSeconds / 60);
          var minuteDisplay = Math.floor(minuteLeft % 60)
          var hourLeft = Math.floor(minuteLeft / 60)
             minuteDisplay < 10 ? minuteDisplay = '0' + minuteDisplay: minuteDisplay;
      
              var secondsLeft = countSeconds % 60;
              secondsLeft < 10 ? secondsLeft = '0' + secondsLeft: secondsLeft;

              hourLeft < 10 ? hourLeft = '0' + hourLeft: hourLeft;
          
              countSeconds--;
              if(countSeconds < 0){
                  countSeconds = 0;
              }
          
              var timer = hourLeft + ':' + minuteDisplay + ':' + secondsLeft
              // console.log(timer);
      }, 1000)
  })
}

countDwn();

//alarm clock.

var sound = new Audio('landras.mp3');
var timer;

function setAlarm(el){
    var time = document.getElementById('alarmTime').valueAsNumber;
    if(isNaN(time)){
    alert("Invalid DateTime");
    return;
}

var alarm = new Date(time);
var alarmTime = new Date(alarm.getUTCFullYear(),alarm.getUTCMonth(), alarm.getUTCDate(),alarm.getUTCHours(),alarm.getUTCMinutes(),alarm.getUTCSeconds());
var duration = alarmTime.getTime() - (new Date()).getTime();

if(duration <0){
    alert('Time is already passed');
    return;
}

timer = setTimeout(initAlarm, duration);
    el.innerHTML = "<span class='glyphiconglyphicon-remove'></span> Cancel Alarm";
    el.setAttribute('onclick','cancelAlarm(this);');
    el.setAttribute('class','btnbtn-danger');
}


function cancelAlarm(el){
    el.innerHTML = "<span class ='glyphiconglyphicon-time'></span> Set Alarm";
    el.setAttribute('onclick','setAlarm(this);');
    el.setAttribute('class','btnbtn-success');
    clearTimeout(timer);
}

function initAlarm(){
    sound.loop = true;
    sound.play();
    document.getElementById('alarmButton').style.display ='none';
    document.getElementById('selectButton').style.display ='';
}

function stopAlarm(){
    sound.pause();
    sound.currentTime = 0;
    document.getElementById('selectButton').style.display = 'none';
    cancelAlarm(document.getElementById('alarmButton'));
    document.getElementById('alarmButton').style.display = '';
}

function snoozeAlarm(){
    stopAlarm();
    setTimeout(() => {
        initAlarm();
    }, 300000);
    button.innerText = "Cancel Alarm";
    button.setAttribute('onclick','cancelAlarm(this);');
}

