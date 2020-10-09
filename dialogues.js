function toDialogue(message){
    var dialogueWindow = document.getElementById("dialogueWindow");
    var p = document.createElement("p");
	dialogueWindow.appendChild(p).innerHTML = message;
	p.scrollIntoView();
}

function playerAnswer(answer){
    var li = document.createElement("li");
    console.log(answer);
    li.setAttribute("id","playerAnswer");
    ol.appendChild(li).innerHTML = answer;
}