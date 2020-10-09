var ol = document.createElement("ol");
function toDialogue(message){
    var dialogueWindow = document.getElementById("dialogueWindow");
    var p = document.createElement("p");
	dialogueWindow.appendChild(p).innerHTML = message;
	p.scrollIntoView();
}

function playerAnswer(answer){
    toString(answer);
    if(!answer.trim()){
        console.log("wrong door")
    }
    else {
        var li = document.createElement("li");
        console.log(answer);
        li.setAttribute("id","playerAnswer");
        ol.appendChild(li).innerHTML = answer;
    }
}

