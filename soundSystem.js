var soundState;
function playSound(soundSource, volume){
    let auidoElement = document.getElementById("gameSound");
    auidoElement.setAttribute("src",soundSource);
    if(soundState==true){
        auidoElement.volume = volume;
        auidoElement.play();
    }
}
function soundStop(){
    let auidoElement = document.getElementById("gameSound");
    auidoElement.Stop();
}

//Login screen sound//
document.getElementById("soundYes").onclick = function(){
    soundState = true;
    playSound("res/sounds/creationMusic.wav","0.1");
    document.getElementById("soundSelectShadow").remove();
}

document.getElementById("soundNo").onclick = function(){
    soundState = false;
    playSound("res/sounds/creationMusic.wav");
    document.getElementById("soundSelectShadow").remove();
    
}