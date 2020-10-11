function playSound(soundSource){
    let auidoElement = document.getElementById("gameSound");
    auidoElement.setAttribute("src",soundSource);
    auidoElement.volume = 0.1;
    auidoElement.play();
}