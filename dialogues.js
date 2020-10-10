
function toDialogue(message){
    var dialogueWindow = document.getElementById("dialogueWindow");
    var p = document.createElement("p");
	dialogueWindow.appendChild(p).innerHTML = message;
    p.scrollIntoView();
 
}

function playerAnswer(answer,i){
    abzAns = document.getElementsByClassName('answerTab')[i];
    toString(answer);
    if(!answer.trim()){
        console.log("wrong door")
    }
    else {
        abzAns.appendChild(document.createElement("p")).setAttribute("id",i);
        document.getElementById(i).classList.add('playerAnswer');
        document.getElementById(i).innerHTML = answer;      
    }

}

function createDialogue(message,answer){
    if(!Array.isArray(answer)){
        return;
    }
    let length = answer.length;
    toDialogue(message);
    for(let i=0;i<length;i++){
        playerAnswer(answer[i],i);
    }
}



document.getElementById("mapDiv").onclick = function(){
    createDialogue(prompt(),[prompt(),"bb","c"],true);
}



/*ol.appendChild(li).innerHTML = answer;
        li.classList.add("playerAnswer");
        li.setAttribute("onclick","confirm(this.id)");
        console.log(li.parentNode.id)
        
         var ol = document.createElement("ol");
    var dialogueWindow = document.getElementById("dialogueWindow");
    var p = document.createElement("p");
	dialogueWindow.appendChild(p).innerHTML = message;
    p.scrollIntoView();
    dialogueWindow.appendChild(ol);
    return ol;
        
        
        */