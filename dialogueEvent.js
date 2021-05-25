'use strict'
var log = function (param) {
    return console.log(param)
}
class dialogueEvent {
    #eventText;
    #answers=[];
    #eventBox = document.getElementsByClassName("events")[0];
    #answerBox = document.getElementsByClassName("event-answers")[0];
    constructor(Name){
        this.name = Name;
    }
    setEventText(String){
        this.#eventText = String;
    }
    addEventAnswer(String){
        this.#answers.push(String);
    }
    buildEvent(){
        let h1 = document.createElement("h1")
        let ol = document.createElement("ol")
        h1.setAttribute("class","eventText");
        h1.innerHTML= this.#eventText;
        this.#eventBox.appendChild(h1);

        for(let i = 0; i < this.#answers.length;i++){
            let li = document.createElement("li")
            li.innerHTML= this.#answers[i];
            ol.appendChild(li);
            this.#answerBox.appendChild(ol);
        }

    }
}

let dg = new dialogueEvent("name");
dg.setEventText("В соответствии с принципом неопределенности, объект отталкивает фонон. Молекула принципиально неизмерима. Поверхность отражает атом. Если предварительно подвергнуть объекты длительному вакуумированию,то квантовое состояние косвенно. Вихрь пространственно усиливает магнит.")

dg.addEventAnswer("strsdsdsds");
dg.addEventAnswer("strsdsdsds");
dg.addEventAnswer("strsdsdsds");
dg.addEventAnswer("strsdsdsds");
dg.addEventAnswer("strsdsdsds");
dg.addEventAnswer("strsdsdsds");
dg.addEventAnswer("strsdsdsds");
dg.addEventAnswer("strsdsdsds");
dg.addEventAnswer("strsdsdsds");
dg.addEventAnswer("strsdsdsds");
dg.buildEvent();
let dg2 = new dialogueEvent("name");
dg2.setEventText("ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ")
dg2.buildEvent();
let dg3 = new dialogueEvent("name");
dg3.setEventText("ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ")
dg3.buildEvent();
let dg4 = new dialogueEvent("name");
dg4.setEventText("ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ ДЛИННЫЙ ТЕКСТ")
dg4.buildEvent();