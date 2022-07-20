// DOM objects

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

// Variables Declaration

var randindex = 0;
var score = 0;
var missed = -1;
var correct = 0;
var level = 5;
var Uname = 'Anonymous';
var audiobg = document.querySelector('.audio1'); // audio file

// Events

wordinput.addEventListener('input', match);
clouds.addEventListener('webkitAnimationIteration', changeword);
clouds.addEventListener('animationiteration', changeword);
startgame.addEventListener('click', startGameNow);

//Functions

function assignLevel(userlevel){
    level = userlevel;
}

// slider.oninput = function() {
//     level = this.value / 10;
//   }

closebtn.onclick = function() {
    resetgame();
  }


  //Function to focus on the input box and clear it
function inpfocus(){
    wordinput.value = '';
    wordinput.focus(); //inbuilt focus function

}

//Function to start the game
function startGameNow()
{
    clouds.style.animation = `cloud ${level}s linear infinite forwards`;
    introbox.style.display = 'none';
    inpfocus();
    audiobg.play();
    if(username.value != '') 
    Uname = username.value;
}

//Function to restart the game
function resetgame()
{
    window.location.reload();  //reloading the window
}

//Function to change the word when cloud animation ends
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
//Function to Set the Highscore and retrieve the High Score
function sethighscore(score, Uname, level){
    var hscore = window.localStorage.getItem('Score'); //Getting score from Local Storage

    scrdisplay.innerHTML = `${score}`;
    usrdisplay.innerHTML = `${Uname}`;
    lvldisplay.innerHTML = `${level}`;
    
    if(hscore <= score) //comparing previous high score with current score
    {
        //setting current details in high score if previous highscore is less
        //than the current score
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

//Function to change word's look and increment score when words are typed correctly
function markcorrect()
{
   wordcloud.style.color = 'grey';
   correct = 1;
}

//Function to increment the missed count when words are typed wrong
function checker()
{
     if(correct === 0)
     {
         missed++;
         missedcount.innerHTML = missed;
     }
 
}
//Function that runs each time when user inputs a character and checks if the user
// input is matching the word in the cloud
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
