const wordinput = document.querySelector('.wordinput');
const wordcloud = document.querySelector('.wordcloud');
const scorecount = document.querySelector('.score');
const missedcount = document.querySelector('.missed');
const startgame = document.querySelector('.play');
const clouds = document.querySelector('.clouds');
const introbox = document.querySelector('.introbox');
const slider = document.querySelector('.slider');
const username = document.querySelector('.username');
const closebtn = document.querySelector('.closebtn');
const popbox = document.querySelector('.popbox');
const scrdisplay = document.querySelector('.scrdisplay');
const usrdisplay = document.querySelector('.usrdisplay');
const lvldisplay = document.querySelector('.lvldisplay');
const hscrdisplay = document.querySelector('.hscrdisplay');
const husrdisplay = document.querySelector('.husrdisplay');
const hlvldisplay = document.querySelector('.hlvldisplay');

var randindex = 0;
var score = 0;
var missed = -1;
var correct = 0;
var level = 5;
var Uname = 'Anonymous';
var audiobg = document.querySelector('.audio1');

wordinput.addEventListener('input', match);
clouds.addEventListener('webkitAnimationIteration', changeword);
clouds.addEventListener('animationiteration', changeword);
startgame.addEventListener('click', startGameNow);



slider.oninput = function() {
    level = this.value / 10;
  }

closebtn.onclick = function() {
    resetgame();
  }

function inpfocus(){
    wordinput.value = '';
    wordinput.focus();

}

function startGameNow()
{
    clouds.style.animation = `cloud ${level}s linear infinite forwards`;
    introbox.style.display = 'none';
    inpfocus();
    audiobg.play();
    if(username.value != '') 
    Uname = username.value;
}

function resetgame()
{
    window.location.reload();
}

function changeword()
{
    checker();
    inpfocus();
    randindex = Math.floor(Math.random() * 12247);
    wordcloud.style.color = 'rgb(59, 58, 58)';
    wordcloud.innerHTML = words[randindex];
    correct = 0;
    if(missed>=5)
    {
        sethighscore(score, Uname, level);
        audiobg.pause();
        clouds.style.animation = `cloud 1000s linear infinite forwards`;
      //  resetgame();
    }
  
}

function sethighscore(score, Uname, level){
    var hscore = window.localStorage.getItem('Score');

    scrdisplay.innerHTML = `${score}`;
    usrdisplay.innerHTML = `${Uname}`;
    lvldisplay.innerHTML = `${level}`;
    
    if(hscore <= score)
    {
        window.localStorage.setItem('Username', Uname);
        window.localStorage.setItem('Score', score);
        window.localStorage.setItem('Level', level);
    }
    hscore = window.localStorage.getItem('Score');
    var husr = window.localStorage.getItem('Username');
    var hlvl = window.localStorage.getItem('Level');
    hscrdisplay.innerHTML = `${hscore}`;
    husrdisplay.innerHTML = `${husr}`;
    hlvldisplay.innerHTML = `${hlvl}`;

    popbox.style.display = 'block';
}

function markcorrect()
{
   wordcloud.style.color = 'grey';
   correct = 1;
}


function checker()
{
     if(correct === 0)
     {
         missed++;
         missedcount.innerHTML = missed;
     }
 
}

function match(){
   if(wordinput.value == wordcloud.innerHTML) 
   { 
     inpfocus();
     markcorrect();
     score++;
     scorecount.innerHTML = score;
     }
    
   else{
   }
}

changeword();
