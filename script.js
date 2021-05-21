'use strict'
let newGameButton = document.getElementsByClassName("new-game")[0];
let menu = document.getElementsByClassName('main-menu')[0];
newGameButton.addEventListener("click",function(){
    /*Hide main menu*/
    menu.style.opacity = 0;
    menu.addEventListener('transitionend',function(){
        menu.style.display="none";
        let creation = document.getElementsByClassName("creation")[0];
        creation.style.display="flex";
    })
    
})

/*var Ico = document.getElementsByClassName('class');
var currentClass = Ico[0];
for(let i=0;i<Ico.length;i++){
    Ico[i].addEventListener('click',function(){

        console.log(currentClass)
        let about = document.getElementsByClassName('about-class')[0];
        if(currentClass!=Ico[i]){
            about.style.top = "260px";
            about.addEventListener('transitionend',function(){
                currentClass = Ico[i];
                about.style.top = "430px";
                about.style.opacity = 1;
            }) 
        } 
        else {
            currentClass = Ico[i];
            about.style.top = "430px";
            about.style.opacity = 1;
        }
        
        

        
    })
}
*/
let maxPoints=document.getElementsByClassName("max-points")[0].children[1].innerHTML;
let plusButton = document.getElementsByName('plus');
for(let i=0;i<plusButton.length;i++){
    plusButton[i].addEventListener('click',function(){
        let char = plusButton[i].parentElement.parentElement.classList[1];
        let currentChar = plusButton[i].parentElement.children[1].innerHTML;
        switch (char){
            case "str":
                if (maxPoints!=0){
                    currentChar++;
                    maxPoints--;
                    plusButton[i].parentElement.children[1].innerHTML = currentChar;
                    document.getElementsByClassName("max-points")[0].children[1].innerHTML=maxPoints;
                } 
                break;
            case "int":
                if (maxPoints!=0){
                    currentChar++;
                    maxPoints--;
                    plusButton[i].parentElement.children[1].innerHTML = currentChar;
                    document.getElementsByClassName("max-points")[0].children[1].innerHTML=maxPoints;
                } 
                break;
            case "agi":
                if (maxPoints!=0){
                    currentChar++;
                    maxPoints--;
                    plusButton[i].parentElement.children[1].innerHTML = currentChar;
                    document.getElementsByClassName("max-points")[0].children[1].innerHTML=maxPoints;
                } 
                break;
            case "luck":
                if (maxPoints!=0){
                    currentChar++;
                    maxPoints--;
                    plusButton[i].parentElement.children[1].innerHTML = currentChar;
                    document.getElementsByClassName("max-points")[0].children[1].innerHTML=maxPoints;
                } 
                break;
        }
    })
}
let minusButton = document.getElementsByName('minus');
for(let i=0;i<minusButton.length;i++){
    minusButton[i].addEventListener('click',function(){
        let char = minusButton[i].parentElement.parentElement.classList[1];
        let currentChar = minusButton[i].parentElement.children[1].innerHTML;
        switch (char){
            case "str":
                if (currentChar>1){
                    currentChar--;
                    maxPoints++;
                    minusButton[i].parentElement.children[1].innerHTML = currentChar;
                    document.getElementsByClassName("max-points")[0].children[1].innerHTML=maxPoints;
                } 
                break;
            case "int":
                if (currentChar>1){
                    currentChar--;
                    maxPoints++;
                    minusButton[i].parentElement.children[1].innerHTML = currentChar;
                    document.getElementsByClassName("max-points")[0].children[1].innerHTML=maxPoints;
                } 
                break;
            case "agi":
                if (currentChar>1){
                    currentChar--;
                    maxPoints++;
                    minusButton[i].parentElement.children[1].innerHTML = currentChar;
                    document.getElementsByClassName("max-points")[0].children[1].innerHTML=maxPoints;
                } 
                break;
            case "luck":
                if (currentChar>1   ){
                    currentChar--;
                    maxPoints++;
                    minusButton[i].parentElement.children[1].innerHTML = currentChar;
                    document.getElementsByClassName("max-points")[0].children[1].innerHTML=maxPoints;
                } 
                break;
        }
    })
}
function saveCharsToStorage() {
    let str = document.getElementsByClassName("player str")[0].children[1].children[1].innerHTML;
    let int = document.getElementsByClassName("player int")[0].children[1].children[1].innerHTML;
    let agi = document.getElementsByClassName("player agi")[0].children[1].children[1].innerHTML;
    let luck = document.getElementsByClassName("player luck")[0].children[1].children[1].innerHTML;
    let name = document.getElementById('player-name').value;
    console.log(name)
    sessionStorage.setItem("str",str);
    sessionStorage.setItem("int",int);
    sessionStorage.setItem("agi",agi);
    sessionStorage.setItem("luck",luck);
    sessionStorage.setItem("name",name);
    console.log(sessionStorage)
}
document.getElementsByClassName("creation-button")[0].addEventListener("click",function () {
    saveCharsToStorage();
})
