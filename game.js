var buttonColor = ['green','red','yellow','blue'];
var gamePattern = [];
var userPattern = [];
var level = 0;
var flag = false;

// Sequence generator
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColor[randomNumber];
    gamePattern.push(randomColor);
    $('#'+randomColor).fadeOut(100).fadeIn(100);
    makeSound(randomColor);
    level++;
    $('#level-title').text('Level '+level);
}

function makeAnimate(colorValue){
    $('#'+colorValue).addClass('pressed');
    setTimeout(function(){
        $('#'+colorValue).removeClass('pressed')
    },200);
}

function makeSound(colorValue){
    var music = new Audio('sounds/'+colorValue+'.mp3');
    music.play();
}

// Attaching event listeners
$('.btn').on('click',function(){
    var clickedColor = this.getAttribute('id');
    userPattern.push(clickedColor);
    makeAnimate(clickedColor);
    makeSound(clickedColor);
    checkAnswer();
})

// Starting the game
$(document).on('keydown',function(){
    if(!level){
        setTimeout(function(){
            nextSequence();
        },500);
        flag = true;
    }
});

// Checking answer
function checkAnswer(){
    if(gamePattern[userPattern.length-1]==userPattern[userPattern.length-1]){
        if(gamePattern.length===userPattern.length){
            userPattern = [];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        $('#level-title').text('Game Over. Press any key to restart.');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        makeSound('wrong');
        gamePattern = [];
        userPattern = [];
        level = 0;
        flag = false;
    }
}