﻿var Player = {
   name:'',
   characterType:'',
   level:0,
   agility:0,
   intellegence:0,
   strength:0,
   luck:0,
}

/*************************************************************/  
    var step = 0;
    classButton = document.getElementById("classButton");
    classTag = document.getElementById("classTag");
   
    function setName(){
        Player.name = document.getElementById("playerName").value;
        console.log(Player.name)
    }

    classButton.onclick = function(){
        step++;
        if(step==1) {
          this.src="res/warrior.png"
          classTag.innerHTML = "Воин"
          Player.characterType="Воин"
          document.getElementById("billyPick").src = "res/billywarrior.png";
          document.getElementById("playerPic").src = "res/billywarrior.png";
        }
        else if (step==2){
            this.src="res/thief.png"
            classTag.innerHTML = "Вор"
            Player.characterType="Вор"
            document.getElementById("billyPick").src = "res/billythief.png";
            document.getElementById("playerPic").src = "res/billythief.png";
        }
        else if(step==3){
            this.src="res/mage.png"
            classTag.innerHTML = "Маг"
            Player.characterType="Маг"
            document.getElementById("billyPick").src = "res/billymag.png";
            document.getElementById("playerPic").src = "res/billymag.png";
            step=0;
            
        };

    }

   	var counter = 10
	var str = document.getElementById("strengthCrt");
	var agi = document.getElementById("agilityCrt");
	var int = document.getElementById("intellegenceCrt");

    function plusSkill(skillType){
		if(counter > 0){

			if(skillType==1){
				Player.strength++;
				str.innerHTML = Player.strength;
				counter--;
			}
				else if(skillType==2){
                Player.agility++;
				agi.innerHTML = Player.agility;
				counter--;
			}
				else if(skillType==3){
				Player.intellegence++;
				int.innerHTML = Player.intellegence;
				counter--;
			
			}
		}
		document.getElementById("counter").innerHTML = counter;
	
}

    function minusSkill(skillType){
            
            if(counter < 10){
                if(skillType==1 && Player.strength > 0){
                    Player.strength--;
                    str.innerHTML = Player.strength;
                    counter++;
                }
                    else if(skillType==2 && Player.agility > 0){
                    Player.agility--;
                    agi.innerHTML = Player.agility;
                    counter++;
                }
                    else if(skillType==3 && Player.intellegence > 0){
                    Player.intellegence--;
                    int.innerHTML = Player.intellegence;
                    counter++;
                
                }
            }
            document.getElementById("counter").innerHTML = counter;
            
    }
    
    function removeCreation(){
        document.getElementById("creation").remove();
        document.body.appendChild(document.createElement("div")).setAttribute("id","mainTable");
        document.getElementById("mainTable").appendChild(document.createElement("div")).setAttribute("id","pictureDiv");
        document.getElementById("mainTable").appendChild(document.createElement("div")).setAttribute("id","mapDiv");
        document.getElementById("mainTable").appendChild(document.createElement("div")).setAttribute("id","dialogueDiv");
        document.getElementById("dialogueDiv").appendChild(document.createElement("div")).setAttribute("id","dialogueWindow");
        document.getElementById("dialogueDiv").appendChild(document.createElement("div")).setAttribute("id","ans1");
        document.getElementById("ans1").classList.add('answerTab');
        document.getElementById("dialogueDiv").appendChild(document.createElement("div")).setAttribute("id","ans2");
        document.getElementById("ans2").classList.add('answerTab');
        document.getElementById("dialogueDiv").appendChild(document.createElement("div")).setAttribute("id","ans3");
        document.getElementById("ans3").classList.add('answerTab');
        document.body.appendChild(document.createElement("script")).src = "dialogues.js";
        document.getElementById("mainTable").appendChild(document.createElement("div")).setAttribute("id","navPanel");
        document.getElementById("navPanel").appendChild(document.createElement("div")).classList.add("navButton");
        document.getElementById("navPanel").appendChild(document.createElement("div")).classList.add("navButton");
        document.getElementById("navPanel").appendChild(document.createElement("div")).classList.add("navButton");
        playSound('res/sounds/mainTheme.wav');
    }
    
    function confirmCharacter(){
        setName();
        if(Player.name==null||Player.name==""){
            alert("Дружок пирожок, ты видимо попутал.Введи имя");
        }
        else{
            if(Player.characterType==null||Player.characterType=="")
            {
                alert("Дружок пирожок, ты видимо попутал.Выбери класс");
            }
            else {
                console.log(Player);
                document.getElementById("creation").style.opacity = 0;
                setTimeout(removeCreation,1000);
            }
        
        }
    }
    